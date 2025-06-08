import requests
import unittest
import json
import sys
from datetime import datetime

class RwandaDiscoveryAPITest(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(RwandaDiscoveryAPITest, self).__init__(*args, **kwargs)
        # Use the public endpoint from frontend/.env
        self.base_url = "https://600cc60e-ad23-4779-98fc-6de34b7a32cd.preview.emergentagent.com"
        self.tests_run = 0
        self.tests_passed = 0

    def setUp(self):
        self.tests_run += 1

    def test_01_health_check(self):
        """Test the health check endpoint"""
        print("\n🔍 Testing health check endpoint...")
        
        try:
            response = requests.get(f"{self.base_url}/api/health")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertEqual(data["status"], "healthy")
            print("✅ Health check passed")
            self.tests_passed += 1
        except Exception as e:
            print(f"❌ Health check failed: {str(e)}")
            raise

    def test_02_get_all_places(self):
        """Test getting all places"""
        print("\n🔍 Testing get all places endpoint...")
        
        try:
            response = requests.get(f"{self.base_url}/api/places")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIsInstance(data, list)
            self.assertGreaterEqual(len(data), 3)  # Should have at least 3 sample places
            
            # Check if the expected sample places are present
            place_names = [place["name"] for place in data]
            expected_places = [
                "Radisson Blu Hotel & Convention Centre",
                "Heaven Restaurant",
                "Rwanda Eco Company & Safaris"
            ]
            
            for expected_place in expected_places:
                self.assertIn(expected_place, place_names, f"Expected place '{expected_place}' not found")
            
            print(f"✅ Get all places passed - Found {len(data)} places")
            self.tests_passed += 1
        except Exception as e:
            print(f"❌ Get all places failed: {str(e)}")
            raise

    def test_03_get_places_by_category(self):
        """Test filtering places by category"""
        print("\n🔍 Testing get places by category...")
        
        categories = ["hotel", "restaurant", "travel"]
        
        for category in categories:
            try:
                response = requests.get(f"{self.base_url}/api/places?category={category}")
                self.assertEqual(response.status_code, 200)
                data = response.json()
                self.assertIsInstance(data, list)
                
                # Check if all returned places match the category
                for place in data:
                    self.assertEqual(place["category"], category)
                
                print(f"✅ Get places by category '{category}' passed - Found {len(data)} places")
            except Exception as e:
                print(f"❌ Get places by category '{category}' failed: {str(e)}")
                raise
        
        self.tests_passed += 1

    def test_04_search_places(self):
        """Test searching places by name"""
        print("\n🔍 Testing search places...")
        
        search_term = "Heaven"
        
        try:
            response = requests.get(f"{self.base_url}/api/places?search={search_term}")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIsInstance(data, list)
            self.assertGreater(len(data), 0)
            
            # Check if all returned places contain the search term
            found_match = False
            for place in data:
                if search_term.lower() in place["name"].lower():
                    found_match = True
                    break
            
            self.assertTrue(found_match, f"No place with name containing '{search_term}' found")
            
            print(f"✅ Search places passed - Found {len(data)} places matching '{search_term}'")
            self.tests_passed += 1
        except Exception as e:
            print(f"❌ Search places failed: {str(e)}")
            raise

    def test_05_advanced_search(self):
        """Test advanced search with POST request"""
        print("\n🔍 Testing advanced search with POST...")
        
        search_data = {
            "query": "Hotel",
            "category": "hotel",
            "user_location": {"lat": -1.9441, "lng": 30.0619}
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/places/search",
                json=search_data,
                headers={"Content-Type": "application/json"}
            )
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIsInstance(data, list)
            
            # Check if returned places match the category
            for place in data:
                self.assertEqual(place["category"], "hotel")
                
                # Check if distance is calculated
                self.assertIn("distance", place)
            
            print(f"✅ Advanced search passed - Found {len(data)} places")
            self.tests_passed += 1
        except Exception as e:
            print(f"❌ Advanced search failed: {str(e)}")
            raise

    def test_06_get_events(self):
        """Test getting all events"""
        print("\n🔍 Testing get all events endpoint...")
        
        try:
            response = requests.get(f"{self.base_url}/api/events")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIsInstance(data, list)
            self.assertGreaterEqual(len(data), 2)  # Should have at least 2 sample events
            
            # Check if the expected sample events are present
            event_names = [event["name"] for event in data]
            expected_events = [
                "Africa Universities Summit 2025",
                "Kigali International Peace Marathon"
            ]
            
            for expected_event in expected_events:
                self.assertIn(expected_event, event_names,
                    f"Expected event '{expected_event}' not found")
            
            print(f"✅ Get all events passed - Found {len(data)} events")
            self.tests_passed += 1
        except Exception as e:
            print(f"❌ Get all events failed: {str(e)}")
            raise

    def test_07_get_categories(self):
        """Test getting all categories"""
        print("\n🔍 Testing get categories endpoint...")
        
        try:
            response = requests.get(f"{self.base_url}/api/categories")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIsInstance(data, list)
            
            # Check if expected categories are present
            categories = [item["category"] for item in data]
            expected_categories = ["hotel", "restaurant", "travel"]
            
            for expected_category in expected_categories:
                self.assertIn(expected_category, categories, f"Expected category '{expected_category}' not found")
            
            print(f"✅ Get categories passed - Found {len(data)} categories")
            self.tests_passed += 1
        except Exception as e:
            print(f"❌ Get categories failed: {str(e)}")
            raise

    def test_08_get_stats(self):
        """Test getting application statistics"""
        print("\n🔍 Testing get stats endpoint...")
        
        try:
            response = requests.get(f"{self.base_url}/api/stats")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIsInstance(data, dict)
            
            # Check if expected stats are present
            expected_keys = ["total_places", "total_events", "hotels", "restaurants", "travel_agencies"]
            for key in expected_keys:
                self.assertIn(key, data, f"Expected stat '{key}' not found")
                self.assertIsInstance(data[key], int)
            
            print(f"✅ Get stats passed")
            self.tests_passed += 1
        except Exception as e:
            print(f"❌ Get stats failed: {str(e)}")
            raise

    def test_09_create_place(self):
        """Test creating a new place"""
        print("\n🔍 Testing create place endpoint...")
        
        new_place = {
            "name": "Test Hotel",
            "category": "hotel",
            "address": "Test Address, Kigali, Rwanda",
            "phone": "+250 788 123 456",
            "website": "https://www.testhotel.com",
            "rating": 4.5,
            "description": "Test hotel description",
            "coordinates": {"lat": -1.9441, "lng": 30.0619},
            "image": "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/places",
                json=new_place,
                headers={"Content-Type": "application/json"}
            )
            self.assertEqual(response.status_code, 200)
            data = response.json()
            
            # Check if returned place has expected fields
            for key in new_place:
                self.assertEqual(data[key], new_place[key])
            
            # Check if ID and created_at are present
            self.assertIn("id", data)
            self.assertIn("created_at", data)
            
            print(f"✅ Create place passed - Created place with ID: {data['id']}")
            self.tests_passed += 1
        except Exception as e:
            print(f"❌ Create place failed: {str(e)}")
            raise

    def test_10_create_event(self):
        """Test creating a new event"""
        print("\n🔍 Testing create event endpoint...")
        
        new_event = {
            "name": "Test Event",
            "date": "December 25, 2025",
            "venue": "Test Venue, Kigali",
            "description": "Test event description",
            "coordinates": {"lat": -1.9441, "lng": 30.0619},
            "image": "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/events",
                json=new_event,
                headers={"Content-Type": "application/json"}
            )
            self.assertEqual(response.status_code, 200)
            data = response.json()
            
            # Check if returned event has expected fields
            for key in new_event:
                self.assertEqual(data[key], new_event[key])
            
            # Check if ID and created_at are present
            self.assertIn("id", data)
            self.assertIn("created_at", data)
            
            print(f"✅ Create event passed - Created event with ID: {data['id']}")
            self.tests_passed += 1
        except Exception as e:
            print(f"❌ Create event failed: {str(e)}")
            raise

    def tearDown(self):
        pass

    def print_summary(self):
        print(f"\n📊 Tests passed: {self.tests_passed}/{self.tests_run}")
        return self.tests_passed == self.tests_run

def run_tests():
    test_suite = unittest.TestSuite()
    test_suite.addTest(unittest.makeSuite(RwandaDiscoveryAPITest))
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(test_suite)
    
    # Print summary
    test_instance = RwandaDiscoveryAPITest()
    success = test_instance.print_summary()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(run_tests())
