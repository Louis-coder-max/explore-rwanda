import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Sample data based on real Rwanda businesses
  const places = [
    // Hotels
    {
      id: 1,
      name: "Radisson Blu Hotel & Convention Centre",
      category: "hotel",
      address: "Convention Centre Roundabout, Kigali, Rwanda",
      phone: "+250 788 150 000",
      website: "https://www.radissonhotels.com/en-us/hotels/radisson-blu-kigali",
      rating: 4.8,
      description: "Five-star hotel with 292 rooms, adjacent to Kigali Convention Centre. Features multiple dining options, outdoor pool, and fitness center.",
      coordinates: { lat: -1.9441, lng: 30.0619 },
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
    },
    {
      id: 2,
      name: "Kigali Marriott Hotel",
      category: "hotel",
      address: "KN 3 Avenue, Kigali, Rwanda",
      phone: "+250 788 177 000",
      website: "https://www.marriott.com/hotels/travel/kglmc-kigali-marriott-hotel",
      rating: 4.7,
      description: "Luxury hotel in city center with spacious rooms, spa, fitness center, and multiple dining venues.",
      coordinates: { lat: -1.9403, lng: 30.0644 },
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
    },
    {
      id: 3,
      name: "Kigali Serena Hotel",
      category: "hotel",
      address: "KN 3 Ave, Kigali, Rwanda",
      phone: "+250 252 597 100",
      website: "https://www.serenahotels.com/kigali",
      rating: 4.6,
      description: "Elegant hotel with large swimming pool, diverse dining options, near Kigali Cultural Village.",
      coordinates: { lat: -1.9423, lng: 30.0581 },
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
    },
    {
      id: 4,
      name: "Hôtel des Mille Collines",
      category: "hotel",
      address: "2KN 6th Ave, Kigali, Rwanda",
      phone: "+250 252 576 530",
      website: "https://www.millecollines.rw",
      rating: 4.5,
      description: "Historic hotel with 112 rooms, bar, café, conference rooms, restaurant, swimming pool, and tennis courts.",
      coordinates: { lat: -1.9447, lng: 30.0588 },
      image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
    },
    {
      id: 5,
      name: "Heaven Restaurant & Boutique Hotel",
      category: "hotel",
      address: "No. 7, KN 29 St, Kigali, Rwanda",
      phone: "+250 788 383 903",
      website: "https://www.heavenrwanda.com",
      rating: 4.8,
      description: "Boutique hotel with locally inspired design, swimming pool, fitness center, and farm-to-table restaurant.",
      coordinates: { lat: -1.9365, lng: 30.0945 },
      image: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg"
    },
    // Restaurants
    {
      id: 6,
      name: "Heaven Restaurant",
      category: "restaurant",
      address: "No. 7, KN 29 St, Kigali, Rwanda",
      phone: "+250 788 383 903",
      website: "https://www.heavenrwanda.com",
      rating: 4.9,
      description: "Farm-to-table restaurant offering fusion of Rwandan and international dishes in a serene setting.",
      coordinates: { lat: -1.9365, lng: 30.0945 },
      image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg"
    },
    {
      id: 7,
      name: "Khana Khazana",
      category: "restaurant",
      address: "KN 31 St, Kigali, Rwanda",
      phone: "+250 788 305 030",
      website: "https://www.khanakhazanarwanda.com",
      rating: 4.6,
      description: "Popular Indian cuisine restaurant offering traditional dishes in a vibrant atmosphere.",
      coordinates: { lat: -1.9389, lng: 30.0983 },
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
    },
    {
      id: 8,
      name: "Repub Lounge",
      category: "restaurant",
      address: "KN 10 Ave, Kigali, Rwanda",
      phone: "+250 788 456 789",
      website: "https://www.republounge.com",
      rating: 4.5,
      description: "Rwandan and African-inspired menu with relaxed ambiance and live music performances.",
      coordinates: { lat: -1.9456, lng: 30.0613 },
      image: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg"
    },
    {
      id: 9,
      name: "The Hut",
      category: "restaurant",
      address: "KG 646 St, Kigali, Rwanda",
      phone: "+250 788 234 567",
      website: "https://www.thehutrestaurant.rw",
      rating: 4.4,
      description: "Diverse international menu with vegetarian options in a cozy setting.",
      coordinates: { lat: -1.9512, lng: 30.0947 },
      image: "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg"
    },
    {
      id: 10,
      name: "Brachetto Restaurant",
      category: "restaurant",
      address: "KG 9 Ave, Kigali, Rwanda",
      phone: "+250 788 345 678",
      website: "https://www.brachetto.rw",
      rating: 4.7,
      description: "Authentic Italian restaurant with extensive wine list and elegant atmosphere.",
      coordinates: { lat: -1.9478, lng: 30.0924 },
      image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg"
    },
    // Travel Agencies
    {
      id: 11,
      name: "Rwanda Eco Company & Safaris",
      category: "travel",
      address: "KG 7 Ave, Kigali, Rwanda",
      phone: "+250 788 450 000",
      website: "https://www.rwandaecocompany.com",
      rating: 4.9,
      description: "Eco-friendly tours including gorilla trekking, wildlife safaris, and cultural experiences.",
      coordinates: { lat: -1.9445, lng: 30.0887 },
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg"
    },
    {
      id: 12,
      name: "Amahoro Tours",
      category: "travel",
      address: "KN 5 Rd, Kigali, Rwanda",
      phone: "+250 788 123 456",
      website: "https://www.amahorotours.com",
      rating: 4.8,
      description: "Customized tours focusing on community-based tourism and cultural immersion.",
      coordinates: { lat: -1.9489, lng: 30.0567 },
      image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg"
    },
    {
      id: 13,
      name: "Primate Safaris",
      category: "travel",
      address: "KN 14 Ave, Kigali, Rwanda",
      phone: "+250 788 789 012",
      website: "https://www.primatesafaris.com",
      rating: 4.7,
      description: "Luxury safaris and tailor-made itineraries across Rwanda and neighboring countries.",
      coordinates: { lat: -1.9401, lng: 30.0623 },
      image: "https://images.pexels.com/photos/2743287/pexels-photo-2743287.jpeg"
    },
    {
      id: 14,
      name: "Wildlife Tours Rwanda",
      category: "travel",
      address: "KG 8 Ave, Kigali, Rwanda",
      phone: "+250 788 567 890",
      website: "https://www.wildlifetoursrwanda.com",
      rating: 4.6,
      description: "Range of tours including gorilla trekking, bird watching, and cultural tours.",
      coordinates: { lat: -1.9467, lng: 30.0876 },
      image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg"
    },
    {
      id: 15,
      name: "Kigali Car Rentals & Tours",
      category: "travel",
      address: "KN 3 Rd, Kigali, Rwanda",
      phone: "+250 788 111 222",
      website: "https://www.kigalicarrentals.com",
      rating: 4.5,
      description: "Car rental services with guided tours to various attractions in Rwanda.",
      coordinates: { lat: -1.9512, lng: 30.0545 },
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg"
    }
  ];

  const events = [
    {
      id: 1,
      name: "Africa Universities Summit 2025",
      date: "March 15-17, 2025",
      venue: "Radisson Blu Hotel & Convention Centre, Kigali",
      description: "Summit focusing on higher education developments across the continent.",
      coordinates: { lat: -1.9441, lng: 30.0619 },
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
    },
    {
      id: 2,
      name: "Kigali International Peace Marathon",
      date: "May 18, 2025",
      venue: "Kigali City",
      description: "Annual marathon promoting peace and unity, attracting runners worldwide.",
      coordinates: { lat: -1.9441, lng: 30.0619 },
      image: "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg"
    },
    {
      id: 3,
      name: "Ubumuntu Arts Festival",
      date: "July 20-25, 2025",
      venue: "Kigali Genocide Memorial Amphitheater",
      description: "Annual festival promoting humanity through performing arts.",
      coordinates: { lat: -1.9508, lng: 30.0945 },
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
    }
  ];

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location access denied");
          // Default to Kigali coordinates
          setUserLocation({ lat: -1.9441, lng: 30.0619 });
        }
      );
    } else {
      // Default to Kigali coordinates
      setUserLocation({ lat: -1.9441, lng: 30.0619 });
    }
  }, []);

  const filteredPlaces = places.filter(place => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getDirections = (place) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${place.coordinates.lat},${place.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  const categories = [
    { id: 'all', name: 'All', icon: '🌍' },
    { id: 'hotel', name: 'Hotels', icon: '🏨' },
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️' },
    { id: 'travel', name: 'Travel Agencies', icon: '✈️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="hero-section relative h-96 bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/30487817/pexels-photo-30487817.jpeg)'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4 rwanda-text">Discover Rwanda</h1>
          <p className="text-xl mb-8 max-w-2xl">Find hotels, restaurants, travel agencies, and events near you in the Land of a Thousand Hills</p>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search places, restaurants, hotels..."
                className="flex-1 px-6 py-4 text-gray-800 text-lg focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-rwanda-blue px-8 py-4 text-white font-semibold hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-rwanda-blue text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-rwanda-yellow hover:text-gray-800 shadow-md'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPlaces.map(place => (
            <div key={place.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={place.image} 
                alt={place.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{place.name}</h3>
                  <div className="flex items-center">
                    <span className="text-rwanda-yellow mr-1">⭐</span>
                    <span className="text-gray-600">{place.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{place.address}</p>
                <p className="text-gray-700 mb-4 text-sm">{place.description}</p>
                
                {userLocation && (
                  <p className="text-sm text-rwanda-green mb-4">
                    📍 {calculateDistance(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng).toFixed(1)} km away
                  </p>
                )}
                
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => getDirections(place)}
                    className="bg-rwanda-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    🗺️ Directions
                  </button>
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-rwanda-yellow text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors text-sm"
                  >
                    🌐 Website
                  </a>
                  <a
                    href={`tel:${place.phone}`}
                    className="bg-rwanda-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    📞 Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Events Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 rwanda-text">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={event.image} 
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
                  <p className="text-rwanda-blue mb-2">📅 {event.date}</p>
                  <p className="text-gray-600 mb-3">📍 {event.venue}</p>
                  <p className="text-gray-700 mb-4 text-sm">{event.description}</p>
                  <button
                    onClick={() => getDirections(event)}
                    className="bg-rwanda-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-rwanda-blue to-rwanda-green text-white py-12 rounded-lg mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Explore Rwanda</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">{places.filter(p => p.category === 'hotel').length}</div>
                <div className="text-lg">Premium Hotels</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{places.filter(p => p.category === 'restaurant').length}</div>
                <div className="text-lg">Top Restaurants</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{places.filter(p => p.category === 'travel').length}</div>
                <div className="text-lg">Travel Agencies</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{events.length}</div>
                <div className="text-lg">Upcoming Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 rwanda-text">Rwanda Discovery</h3>
          <p className="text-gray-300 mb-4">Your gateway to exploring the Land of a Thousand Hills</p>
          <p className="text-gray-400">&copy; 2025 Rwanda Discovery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;