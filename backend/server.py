from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from motor.motor_asyncio import AsyncIOMotorClient
import uuid
from datetime import datetime

app = FastAPI(title="Rwanda Discovery API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(MONGO_URL)
db = client.rwanda_discovery

# Pydantic models
class PlaceBase(BaseModel):
    name: str
    category: str  # hotel, restaurant, travel, salon, shop, etc.
    address: str
    phone: Optional[str] = None
    website: Optional[str] = None
    rating: Optional[float] = 0.0
    description: Optional[str] = None
    coordinates: dict  # {"lat": float, "lng": float}
    image: Optional[str] = None

class Place(PlaceBase):
    id: str
    created_at: datetime

class EventBase(BaseModel):
    name: str
    date: str
    venue: str
    description: Optional[str] = None
    coordinates: dict
    image: Optional[str] = None

class Event(EventBase):
    id: str
    created_at: datetime

class SearchQuery(BaseModel):
    query: Optional[str] = ""
    category: Optional[str] = "all"
    user_location: Optional[dict] = None

# Helper function to calculate distance
def calculate_distance(lat1, lng1, lat2, lng2):
    from math import sin, cos, sqrt, atan2, radians
    
    R = 6371  # Earth's radius in kilometers
    
    lat1, lng1, lat2, lng2 = map(radians, [lat1, lng1, lat2, lng2])
    
    dlat = lat2 - lat1
    dlng = lng2 - lng1
    
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlng/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    
    return R * c

# Sample data initialization
sample_places = [
    {
        "id": str(uuid.uuid4()),
        "name": "Radisson Blu Hotel & Convention Centre",
        "category": "hotel",
        "address": "Convention Centre Roundabout, Kigali, Rwanda",
        "phone": "+250 788 150 000",
        "website": "https://www.radissonhotels.com/en-us/hotels/radisson-blu-kigali",
        "rating": 4.8,
        "description": "Five-star hotel with 292 rooms, adjacent to Kigali Convention Centre.",
        "coordinates": {"lat": -1.9441, "lng": 30.0619},
        "image": "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
        "created_at": datetime.now()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Heaven Restaurant",
        "category": "restaurant",
        "address": "No. 7, KN 29 St, Kigali, Rwanda",
        "phone": "+250 788 383 903",
        "website": "https://www.heavenrwanda.com",
        "rating": 4.9,
        "description": "Farm-to-table restaurant offering fusion of Rwandan and international dishes.",
        "coordinates": {"lat": -1.9365, "lng": 30.0945},
        "image": "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
        "created_at": datetime.now()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Rwanda Eco Company & Safaris",
        "category": "travel",
        "address": "KG 7 Ave, Kigali, Rwanda",
        "phone": "+250 788 450 000",
        "website": "https://www.rwandaecocompany.com",
        "rating": 4.9,
        "description": "Eco-friendly tours including gorilla trekking, wildlife safaris, and cultural experiences.",
        "coordinates": {"lat": -1.9445, "lng": 30.0887},
        "image": "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg",
        "created_at": datetime.now()
    }
]

sample_events = [
    {
        "id": str(uuid.uuid4()),
        "name": "Africa Universities Summit 2025",
        "date": "March 15-17, 2025",
        "venue": "Radisson Blu Hotel & Convention Centre, Kigali",
        "description": "Summit focusing on higher education developments across the continent.",
        "coordinates": {"lat": -1.9441, "lng": 30.0619},
        "image": "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
        "created_at": datetime.now()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Kigali International Peace Marathon",
        "date": "May 18, 2025",
        "venue": "Kigali City",
        "description": "Annual marathon promoting peace and unity, attracting runners worldwide.",
        "coordinates": {"lat": -1.9441, "lng": 30.0619},
        "image": "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg",
        "created_at": datetime.now()
    }
]

@app.on_event("startup")
async def startup_event():
    """Initialize database with sample data"""
    try:
        # Check if data already exists
        places_count = await db.places.count_documents({})
        events_count = await db.events.count_documents({})
        
        if places_count == 0:
            await db.places.insert_many(sample_places)
            print(f"Inserted {len(sample_places)} sample places")
        
        if events_count == 0:
            await db.events.insert_many(sample_events)
            print(f"Inserted {len(sample_events)} sample events")
            
    except Exception as e:
        print(f"Error initializing database: {e}")

# API Endpoints
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Rwanda Discovery API is running"}

@app.get("/api/places", response_model=List[dict])
async def get_places(category: Optional[str] = None, search: Optional[str] = None):
    """Get all places with optional filtering"""
    try:
        query = {}
        
        if category and category != "all":
            query["category"] = category
            
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"address": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}}
            ]
        
        places = await db.places.find(query).to_list(None)
        
        # Convert ObjectId to string and format response
        for place in places:
            if "_id" in place:
                del place["_id"]
            place["created_at"] = place["created_at"].isoformat() if "created_at" in place else None
            
        return places
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching places: {str(e)}")

@app.get("/api/events", response_model=List[dict])
async def get_events():
    """Get all events"""
    try:
        events = await db.events.find({}).to_list(None)
        
        # Convert ObjectId to string and format response
        for event in events:
            if "_id" in event:
                del event["_id"]
            event["created_at"] = event["created_at"].isoformat() if "created_at" in event else None
            
        return events
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching events: {str(e)}")

@app.post("/api/places/search")
async def search_places(search_query: SearchQuery):
    """Advanced search with location-based sorting"""
    try:
        query = {}
        
        # Category filter
        if search_query.category and search_query.category != "all":
            query["category"] = search_query.category
            
        # Text search
        if search_query.query:
            query["$or"] = [
                {"name": {"$regex": search_query.query, "$options": "i"}},
                {"address": {"$regex": search_query.query, "$options": "i"}},
                {"description": {"$regex": search_query.query, "$options": "i"}}
            ]
        
        places = await db.places.find(query).to_list(None)
        
        # Calculate distances if user location provided
        if search_query.user_location:
            user_lat = search_query.user_location.get("lat")
            user_lng = search_query.user_location.get("lng")
            
            for place in places:
                if "coordinates" in place:
                    place_lat = place["coordinates"].get("lat")
                    place_lng = place["coordinates"].get("lng")
                    
                    if place_lat and place_lng:
                        distance = calculate_distance(user_lat, user_lng, place_lat, place_lng)
                        place["distance"] = round(distance, 2)
                    else:
                        place["distance"] = None
                        
            # Sort by distance
            places.sort(key=lambda x: x.get("distance", float('inf')))
        
        # Format response
        for place in places:
            if "_id" in place:
                del place["_id"]
            place["created_at"] = place["created_at"].isoformat() if "created_at" in place else None
            
        return places
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching places: {str(e)}")

@app.post("/api/places", response_model=dict)
async def create_place(place: PlaceBase):
    """Create a new place"""
    try:
        place_dict = place.dict()
        place_dict["id"] = str(uuid.uuid4())
        place_dict["created_at"] = datetime.now()
        
        await db.places.insert_one(place_dict)
        
        # Format response
        if "_id" in place_dict:
            del place_dict["_id"]
        place_dict["created_at"] = place_dict["created_at"].isoformat()
        
        return place_dict
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating place: {str(e)}")

@app.post("/api/events", response_model=dict)
async def create_event(event: EventBase):
    """Create a new event"""
    try:
        event_dict = event.dict()
        event_dict["id"] = str(uuid.uuid4())
        event_dict["created_at"] = datetime.now()
        
        await db.events.insert_one(event_dict)
        
        # Format response
        if "_id" in event_dict:
            del event_dict["_id"]
        event_dict["created_at"] = event_dict["created_at"].isoformat()
        
        return event_dict
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating event: {str(e)}")

@app.get("/api/categories")
async def get_categories():
    """Get all available categories"""
    try:
        pipeline = [
            {"$group": {"_id": "$category", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        
        categories = await db.places.aggregate(pipeline).to_list(None)
        
        return [{"category": cat["_id"], "count": cat["count"]} for cat in categories]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching categories: {str(e)}")

@app.get("/api/stats")
async def get_stats():
    """Get application statistics"""
    try:
        total_places = await db.places.count_documents({})
        total_events = await db.events.count_documents({})
        
        # Count by category
        hotels = await db.places.count_documents({"category": "hotel"})
        restaurants = await db.places.count_documents({"category": "restaurant"})
        travel_agencies = await db.places.count_documents({"category": "travel"})
        
        return {
            "total_places": total_places,
            "total_events": total_events,
            "hotels": hotels,
            "restaurants": restaurants,
            "travel_agencies": travel_agencies
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stats: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)