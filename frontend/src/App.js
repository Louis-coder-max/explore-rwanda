import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBookingPlace, setSelectedBookingPlace] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

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
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      priceRange: "$150-300/night",
      bookingCommission: 8
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
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      priceRange: "$120-250/night",
      bookingCommission: 8
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
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
      priceRange: "$100-220/night",
      bookingCommission: 8
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
      image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      priceRange: "$90-200/night",
      bookingCommission: 8
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
      image: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
      priceRange: "$80-180/night",
      bookingCommission: 8
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
      image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
      priceRange: "$25-60/person",
      bookingCommission: 10
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
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
      priceRange: "$20-45/person",
      bookingCommission: 10
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
      image: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
      priceRange: "$15-40/person",
      bookingCommission: 10
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
      image: "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg",
      priceRange: "$18-35/person",
      bookingCommission: 10
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
      image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg",
      priceRange: "$22-50/person",
      bookingCommission: 10
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
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg",
      priceRange: "$200-1500/tour",
      bookingCommission: 12
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
      image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
      priceRange: "$150-800/tour",
      bookingCommission: 12
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
      image: "https://images.pexels.com/photos/2743287/pexels-photo-2743287.jpeg",
      priceRange: "$300-2000/tour",
      bookingCommission: 12
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
      image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg",
      priceRange: "$180-1200/tour",
      bookingCommission: 12
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
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      priceRange: "$50-200/day",
      bookingCommission: 12
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
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
      priceRange: "$200-500/ticket",
      bookingCommission: 15
    },
    {
      id: 2,
      name: "Kigali International Peace Marathon",
      date: "May 18, 2025",
      venue: "Kigali City",
      description: "Annual marathon promoting peace and unity, attracting runners worldwide.",
      coordinates: { lat: -1.9441, lng: 30.0619 },
      image: "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg",
      priceRange: "$25-100/registration",
      bookingCommission: 15
    },
    {
      id: 3,
      name: "Ubumuntu Arts Festival",
      date: "July 20-25, 2025",
      venue: "Kigali Genocide Memorial Amphitheater",
      description: "Annual festival promoting humanity through performing arts.",
      coordinates: { lat: -1.9508, lng: 30.0945 },
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
      priceRange: "$15-80/ticket",
      bookingCommission: 15
    }
  ];

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('rwandaDiscoveryUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setShowAuthModal(false);
    }

    // Check dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

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

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleAuth = (formData) => {
    // Mock authentication - in real app would call backend
    const userData = {
      id: Date.now(),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    localStorage.setItem('rwandaDiscoveryUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setShowAuthModal(true);
    localStorage.removeItem('rwandaDiscoveryUser');
  };

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

  const calculateTravelTime = (distance) => {
    // Mock travel time calculation (in real app would use Google Maps API)
    const avgSpeed = 30; // km/h average speed in Kigali
    const timeInHours = distance / avgSpeed;
    const timeInMinutes = Math.round(timeInHours * 60);
    
    if (timeInMinutes < 60) {
      return `${timeInMinutes} min`;
    } else {
      const hours = Math.floor(timeInMinutes / 60);
      const minutes = timeInMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  const getDirections = (place) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${place.coordinates.lat},${place.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  const openBookingModal = (place) => {
    setSelectedBookingPlace(place);
    setShowBookingModal(true);
  };

  const categories = [
    { id: 'all', name: 'All', icon: '🌍' },
    { id: 'hotel', name: 'Hotels', icon: '🏨' },
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️' },
    { id: 'travel', name: 'Travel Agencies', icon: '✈️' }
  ];

  // Authentication Modal Component
  const AuthModal = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-black'} bg-opacity-50`}>
      <div className="auth-modal relative w-full h-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511283878565-0833bf39de9d" 
            alt="Rwanda Nature"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full p-4">
          <div className={`max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-8`}>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold rwanda-text mb-2">Rwanda Discovery</h1>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                "Explore the Land of a Thousand Hills - Your Gateway to Rwanda's Beauty"
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Join thousands of travelers discovering Rwanda's hidden gems
              </p>
            </div>

            <div className="flex mb-6">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 px-4 rounded-l-lg font-semibold ${
                  authMode === 'login'
                    ? `bg-rwanda-blue text-white`
                    : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 px-4 rounded-r-lg font-semibold ${
                  authMode === 'signup'
                    ? `bg-rwanda-blue text-white`
                    : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAuth(Object.fromEntries(formData));
            }}>
              {authMode === 'signup' && (
                <div className="mb-4">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rwanda-blue ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rwanda-blue ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="mb-6">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rwanda-blue ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-rwanda-blue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {authMode === 'login' ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-rwanda-blue hover:underline font-semibold"
                >
                  {authMode === 'login' ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Booking Modal Component
  const BookingModal = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-black'} bg-opacity-50`}>
      <div className={`max-w-2xl w-full mx-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 max-h-screen overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Book {selectedBookingPlace?.name}
          </h2>
          <button
            onClick={() => setShowBookingModal(false)}
            className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <img 
            src={selectedBookingPlace?.image} 
            alt={selectedBookingPlace?.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            {selectedBookingPlace?.description}
          </p>
          <p className={`text-lg font-semibold ${darkMode ? 'text-rwanda-yellow' : 'text-rwanda-blue'}`}>
            {selectedBookingPlace?.priceRange}
          </p>
        </div>

        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Check-in / Date
              </label>
              <input
                type="date"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rwanda-blue ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Check-out / End Date
              </label>
              <input
                type="date"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rwanda-blue ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Guests / Participants
              </label>
              <select className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rwanda-blue ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Contact Phone
              </label>
              <input
                type="tel"
                placeholder="+250 788 123 456"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rwanda-blue ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Special Requests
            </label>
            <textarea
              rows="3"
              placeholder="Any special requirements or requests..."
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rwanda-blue ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            ></textarea>
          </div>

          <div className={`border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'} pt-4`}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
              Payment Options
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                darkMode ? 'border-gray-600 hover:border-rwanda-blue' : 'border-gray-300 hover:border-rwanda-blue'
              }`}>
                <input type="radio" name="payment" value="card" className="mr-3" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>💳 Credit/Debit Card</span>
              </label>
              
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                darkMode ? 'border-gray-600 hover:border-rwanda-blue' : 'border-gray-300 hover:border-rwanda-blue'
              }`}>
                <input type="radio" name="payment" value="paypal" className="mr-3" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>🟦 PayPal</span>
              </label>
              
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                darkMode ? 'border-gray-600 hover:border-rwanda-blue' : 'border-gray-300 hover:border-rwanda-blue'
              }`}>
                <input type="radio" name="payment" value="mobile" className="mr-3" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>📱 Mobile Money</span>
              </label>
              
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                darkMode ? 'border-gray-600 hover:border-rwanda-blue' : 'border-gray-300 hover:border-rwanda-blue'
              }`}>
                <input type="radio" name="payment" value="visa" className="mr-3" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>🔵 Visa</span>
              </label>
            </div>

            <div className={`bg-rwanda-yellow bg-opacity-20 p-4 rounded-lg mb-4`}>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Commission Included:</strong> {selectedBookingPlace?.bookingCommission}% booking fee is included to support Rwanda Discovery platform.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className={`flex-1 py-3 px-4 border rounded-lg font-semibold ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-rwanda-blue text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (showAuthModal) {
    return <AuthModal />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold rwanda-text">Rwanda Discovery</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Welcome, {user?.name}!
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-rwanda-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <div className="hero-section relative h-96 bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1643727921394-2b6063f6a854" 
            alt="Rwanda Nature Video"
            className="w-full h-full object-cover transition-transform duration-20000 hover:scale-105"
          />
        </div>
        <div className={`absolute inset-0 ${darkMode ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-40'}`}></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4 rwanda-text-light">Discover Rwanda</h1>
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
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-rwanda-yellow hover:text-gray-800 shadow-md'
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
          {filteredPlaces.map(place => {
            const distance = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng) : null;
            const travelTime = distance ? calculateTravelTime(distance) : null;
            
            return (
              <div key={place.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}>
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{place.name}</h3>
                    <div className="flex items-center">
                      <span className="text-rwanda-yellow mr-1">⭐</span>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{place.rating}</span>
                    </div>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{place.address}</p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-2 text-sm`}>{place.description}</p>
                  <p className={`font-semibold ${darkMode ? 'text-rwanda-yellow' : 'text-rwanda-blue'} mb-4`}>{place.priceRange}</p>
                  
                  {travelTime && (
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded-lg mb-4`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        📍 {distance.toFixed(1)} km away • 🕒 {travelTime} travel time
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => getDirections(place)}
                      className="bg-rwanda-green text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      🗺️ Directions
                    </button>
                    <button
                      onClick={() => openBookingModal(place)}
                      className="bg-rwanda-yellow text-gray-800 px-3 py-2 rounded-lg hover:bg-yellow-500 transition-colors text-sm"
                    >
                      📅 Book Now
                    </button>
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-rwanda-blue text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      🌐 Website
                    </a>
                    <a
                      href={`tel:${place.phone}`}
                      className={`${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} px-3 py-2 rounded-lg transition-colors text-sm`}
                    >
                      📞 Call
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Events Section */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold text-center mb-8 ${darkMode ? 'rwanda-text-dark' : 'rwanda-text'}`}>Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => {
              const distance = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, event.coordinates.lat, event.coordinates.lng) : null;
              const travelTime = distance ? calculateTravelTime(distance) : null;
              
              return (
                <div key={event.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}>
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{event.name}</h3>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-rwanda-blue'} mb-2`}>📅 {event.date}</p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>📍 {event.venue}</p>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-3 text-sm`}>{event.description}</p>
                    <p className={`font-semibold ${darkMode ? 'text-rwanda-yellow' : 'text-rwanda-blue'} mb-4`}>{event.priceRange}</p>
                    
                    {travelTime && (
                      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded-lg mb-4`}>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          📍 {distance.toFixed(1)} km away • 🕒 {travelTime} travel time
                        </p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openBookingModal(event)}
                        className="flex-1 bg-rwanda-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        📅 Book Ticket
                      </button>
                      <button
                        onClick={() => getDirections(event)}
                        className={`${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} px-4 py-2 rounded-lg transition-colors`}
                      >
                        🗺️ Directions
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-rwanda-blue to-rwanda-green'} text-white py-12 rounded-lg mb-8`}>
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
      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-800'} text-white py-8`}>
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 rwanda-text-light">Rwanda Discovery</h3>
          <p className="text-gray-300 mb-4">Your gateway to exploring the Land of a Thousand Hills</p>
          <p className="text-gray-400">&copy; 2025 Rwanda Discovery. All rights reserved.</p>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && <BookingModal />}
    </div>
  );
};

export default App;