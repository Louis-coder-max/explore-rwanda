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
  const [authMode, setAuthMode] = useState('login');
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showTrendingPopup, setShowTrendingPopup] = useState(false);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [selectedDetailPlace, setSelectedDetailPlace] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);

  // Enhanced sample data with more venues from search
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
      bookingCommission: 8,
      services: ["24/7 Room Service", "Outdoor Pool", "Fitness Center", "Spa", "Conference Rooms", "Free WiFi"],
      detailedPricing: { usd: "150-300", rwf: "195,000-390,000" },
      isHighRated: true
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
      bookingCommission: 8,
      services: ["Luxury Spa", "Multiple Restaurants", "Business Center", "Pool", "Valet Parking"],
      detailedPricing: { usd: "120-250", rwf: "156,000-325,000" },
      isHighRated: true
    },
    {
      id: 3,
      name: "Four Points by Sheraton Kigali",
      category: "hotel",
      address: "KG 4 Ave, Kigali, Rwanda",
      phone: "+250 788 300 400",
      website: null, // Internal detail page
      rating: 4.6,
      description: "Modern hotel featuring nine event rooms totaling 625 square meters, with accommodations for up to 200 guests.",
      coordinates: { lat: -1.9423, lng: 30.0581 },
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
      priceRange: "$100-220/night",
      bookingCommission: 8,
      services: ["Event Spaces", "Modern Amenities", "Catering Services", "Business Facilities", "Airport Shuttle"],
      detailedPricing: { usd: "100-220", rwf: "130,000-286,000" },
      isHighRated: false
    },
    {
      id: 4,
      name: "Kigali Serena Hotel",
      category: "hotel",
      address: "KN 3 Ave, Kigali, Rwanda",
      phone: "+250 252 597 100",
      website: "https://www.serenahotels.com/kigali",
      rating: 4.5,
      description: "Elegant hotel with 148 rooms and the largest conference facilities in Rwanda, including a 500-seater auditorium.",
      coordinates: { lat: -1.9447, lng: 30.0588 },
      image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      priceRange: "$90-200/night",
      bookingCommission: 8,
      services: ["Conference Facilities", "500-Seat Auditorium", "Ballroom", "Business Center", "Garden Views"],
      detailedPricing: { usd: "90-200", rwf: "117,000-260,000" },
      isHighRated: false
    },
    {
      id: 5,
      name: "Park Inn by Radisson Kigali",
      category: "hotel",
      address: "KG 5 Ave, Kigali, Rwanda",
      phone: "+250 788 383 903",
      website: null, // Internal detail page
      rating: 4.4,
      description: "Contemporary hotel with 161 rooms and versatile meeting spaces, including a 4,198 sq. ft. event room.",
      coordinates: { lat: -1.9365, lng: 30.0945 },
      image: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
      priceRange: "$80-180/night",
      bookingCommission: 8,
      services: ["Contemporary Rooms", "Meeting Spaces", "Event Facilities", "Restaurant", "Fitness Center"],
      detailedPricing: { usd: "80-180", rwf: "104,000-234,000" },
      isHighRated: false
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
      description: "Farm-to-table restaurant offering fusion of Rwandan and international dishes in a serene setting with organic ingredients.",
      coordinates: { lat: -1.9365, lng: 30.0945 },
      image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
      priceRange: "$25-60/person",
      bookingCommission: 10,
      services: ["Farm-to-Table Dining", "Organic Ingredients", "Private Dining", "Catering", "Wine Selection"],
      detailedPricing: { usd: "25-60", rwf: "32,500-78,000" },
      isHighRated: true
    },
    {
      id: 7,
      name: "Khana Khazana",
      category: "restaurant",
      address: "KN 31 St, Kigali, Rwanda",
      phone: "+250 788 305 030",
      website: null, // Internal detail page
      rating: 4.6,
      description: "Authentic Indian cuisine restaurant offering traditional dishes with aromatic spices in a vibrant, cultural atmosphere.",
      coordinates: { lat: -1.9389, lng: 30.0983 },
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
      priceRange: "$20-45/person",
      bookingCommission: 10,
      services: ["Authentic Indian Cuisine", "Traditional Spices", "Vegetarian Options", "Private Events", "Takeaway"],
      detailedPricing: { usd: "20-45", rwf: "26,000-58,500" },
      isHighRated: true
    },
    {
      id: 8,
      name: "Repub Lounge",
      category: "restaurant",
      address: "KN 10 Ave, Kigali, Rwanda",
      phone: "+250 788 456 789",
      website: "https://www.republounge.com",
      rating: 4.5,
      description: "Rwandan and African-inspired menu with relaxed ambiance, live music performances, and cultural entertainment.",
      coordinates: { lat: -1.9456, lng: 30.0613 },
      image: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
      priceRange: "$15-40/person",
      bookingCommission: 10,
      services: ["Live Music", "Cultural Entertainment", "African Cuisine", "Outdoor Seating", "Event Hosting"],
      detailedPricing: { usd: "15-40", rwf: "19,500-52,000" },
      isHighRated: false
    },
    {
      id: 9,
      name: "Flamingo Chinese Restaurant",
      category: "restaurant",
      address: "KG 646 St, Kigali, Rwanda",
      phone: "+250 788 234 567",
      website: null, // Internal detail page
      rating: 4.4,
      description: "Elegant Chinese restaurant offering authentic dishes with diverse international menu and vegetarian options in cozy setting.",
      coordinates: { lat: -1.9512, lng: 30.0947 },
      image: "https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg",
      priceRange: "$18-35/person",
      bookingCommission: 10,
      services: ["Authentic Chinese Cuisine", "Vegetarian Options", "Private Dining", "Family Packages", "Delivery"],
      detailedPricing: { usd: "18-35", rwf: "23,400-45,500" },
      isHighRated: false
    },
    {
      id: 10,
      name: "Brachetto Restaurant",
      category: "restaurant",
      address: "KG 9 Ave, Kigali, Rwanda",
      phone: "+250 788 345 678",
      website: "https://www.brachetto.rw",
      rating: 4.7,
      description: "Authentic Italian restaurant with extensive wine list, elegant atmosphere, and handmade pasta specialties.",
      coordinates: { lat: -1.9478, lng: 30.0924 },
      image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg",
      priceRange: "$22-50/person",
      bookingCommission: 10,
      services: ["Italian Cuisine", "Extensive Wine List", "Handmade Pasta", "Romantic Dining", "Private Events"],
      detailedPricing: { usd: "22-50", rwf: "28,600-65,000" },
      isHighRated: true
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
      description: "Premier eco-friendly tours including gorilla trekking, wildlife safaris, cultural experiences, and sustainable tourism packages.",
      coordinates: { lat: -1.9445, lng: 30.0887 },
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg",
      priceRange: "$200-1500/tour",
      bookingCommission: 12,
      services: ["Gorilla Trekking", "Wildlife Safaris", "Cultural Tours", "Eco-Tourism", "Photography Tours"],
      detailedPricing: { usd: "200-1500", rwf: "260,000-1,950,000" },
      isHighRated: true
    },
    {
      id: 12,
      name: "Amahoro Tours",
      category: "travel",
      address: "KN 5 Rd, Kigali, Rwanda",
      phone: "+250 788 123 456",
      website: null, // Internal detail page
      rating: 4.8,
      description: "Customized tours focusing on community-based tourism, cultural immersion, and authentic Rwandan experiences.",
      coordinates: { lat: -1.9489, lng: 30.0567 },
      image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
      priceRange: "$150-800/tour",
      bookingCommission: 12,
      services: ["Community Tourism", "Cultural Immersion", "Village Visits", "Craft Workshops", "Local Guides"],
      detailedPricing: { usd: "150-800", rwf: "195,000-1,040,000" },
      isHighRated: true
    },
    {
      id: 13,
      name: "Primate Safaris",
      category: "travel",
      address: "KN 14 Ave, Kigali, Rwanda",
      phone: "+250 788 789 012",
      website: "https://www.primatesafaris.com",
      rating: 4.7,
      description: "Luxury safaris and tailor-made itineraries across Rwanda and neighboring countries with premium accommodations.",
      coordinates: { lat: -1.9401, lng: 30.0623 },
      image: "https://images.pexels.com/photos/2743287/pexels-photo-2743287.jpeg",
      priceRange: "$300-2000/tour",
      bookingCommission: 12,
      services: ["Luxury Safaris", "Tailor-Made Tours", "Premium Accommodations", "Private Guides", "Multi-Country Tours"],
      detailedPricing: { usd: "300-2000", rwf: "390,000-2,600,000" },
      isHighRated: false
    },
    {
      id: 14,
      name: "Wildlife Tours Rwanda",
      category: "travel",
      address: "KG 8 Ave, Kigali, Rwanda",
      phone: "+250 788 567 890",
      website: null, // Internal detail page
      rating: 4.6,
      description: "Comprehensive wildlife tours including gorilla trekking, bird watching, cultural tours, and conservation experiences.",
      coordinates: { lat: -1.9467, lng: 30.0876 },
      image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg",
      priceRange: "$180-1200/tour",
      bookingCommission: 12,
      services: ["Gorilla Trekking", "Bird Watching", "Cultural Tours", "Conservation Tours", "Photography Safaris"],
      detailedPricing: { usd: "180-1200", rwf: "234,000-1,560,000" },
      isHighRated: false
    },
    {
      id: 15,
      name: "Kigali Car Rentals & Tours",
      category: "travel",
      address: "KN 3 Rd, Kigali, Rwanda",
      phone: "+250 788 111 222",
      website: "https://www.kigalicarrentals.com",
      rating: 4.5,
      description: "Professional car rental services with guided tours to various attractions, self-drive options, and airport transfers.",
      coordinates: { lat: -1.9512, lng: 30.0545 },
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      priceRange: "$50-200/day",
      bookingCommission: 12,
      services: ["Car Rentals", "Guided Tours", "Self-Drive Options", "Airport Transfers", "City Tours"],
      detailedPricing: { usd: "50-200", rwf: "65,000-260,000" },
      isHighRated: false
    }
  ];

  const events = [
    {
      id: 1,
      name: "Kigali International Peace Marathon",
      date: "May 18, 2025",
      venue: "Kigali City",
      description: "Annual marathon promoting peace and unity, attracting runners worldwide with various race categories.",
      coordinates: { lat: -1.9441, lng: 30.0619 },
      image: "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg",
      priceRange: "$25-100/registration",
      bookingCommission: 15,
      isTrending: true
    },
    {
      id: 2,
      name: "Africa Universities Summit 2025",
      date: "March 15-17, 2025",
      venue: "Radisson Blu Hotel & Convention Centre, Kigali",
      description: "Summit focusing on higher education developments across the continent.",
      coordinates: { lat: -1.9441, lng: 30.0619 },
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
      priceRange: "$200-500/ticket",
      bookingCommission: 15,
      isTrending: false
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
      bookingCommission: 15,
      isTrending: false
    }
  ];

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('rwandaDiscoveryUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setShowAuthModal(false);
      // Show trending popup after login
      setTimeout(() => setShowTrendingPopup(true), 1000);
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
          setUserLocation({ lat: -1.9441, lng: 30.0619 });
        }
      );
    } else {
      setUserLocation({ lat: -1.9441, lng: 30.0619 });
    }
  }, []);

  useEffect(() => {
    if (showTrendingPopup) {
      const timer = setTimeout(() => setShowTrendingPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTrendingPopup]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleAuth = (formData) => {
    const userData = {
      id: Date.now(),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      joinDate: new Date().toLocaleDateString()
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    localStorage.setItem('rwandaDiscoveryUser', JSON.stringify(userData));
    
    // Show trending popup after successful auth
    setTimeout(() => setShowTrendingPopup(true), 1000);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setShowAuthModal(true);
    setShowUserProfile(false);
    localStorage.removeItem('rwandaDiscoveryUser');
  };

  const filteredPlaces = places.filter(place => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getHighRatedPlaces = (category) => {
    return places.filter(place => place.category === category && place.isHighRated);
  };

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
    const avgSpeed = 30;
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

  const openDetailPage = (place) => {
    setSelectedDetailPlace(place);
    setShowDetailPage(true);
  };

  const getRatingEmojis = (rating, isHovered = false) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emojis = [];
    
    for (let i = 0; i < fullStars; i++) {
      emojis.push(isHovered ? '🌟' : '⭐');
    }
    if (hasHalf) {
      emojis.push(isHovered ? '✨' : '⭐');
    }
    
    return emojis.join('');
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
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511283878565-0833bf39de9d" 
            alt="Rwanda Nature"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
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

  // Trending Event Popup
  const TrendingPopup = () => {
    const trendingEvent = events.find(event => event.isTrending);
    if (!trendingEvent) return null;

    return (
      <div className="fixed top-4 right-4 z-50 animate-pulse">
        <div className={`${darkMode ? 'bg-gradient-to-r from-purple-800 to-pink-800' : 'bg-gradient-to-r from-rwanda-blue to-rwanda-green'} text-white p-6 rounded-lg shadow-xl max-w-sm`}>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold">🔥 Trending Now!</h3>
            <button 
              onClick={() => setShowTrendingPopup(false)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
          <div className="flex gap-3">
            <img src={trendingEvent.image} alt={trendingEvent.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h4 className="font-semibold">{trendingEvent.name}</h4>
              <p className="text-sm opacity-90">{trendingEvent.date}</p>
              <p className="text-xs opacity-75">{trendingEvent.venue}</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setShowTrendingPopup(false);
              openBookingModal(trendingEvent);
            }}
            className="w-full mt-3 bg-white text-gray-800 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    );
  };

  // User Profile Modal
  const UserProfileModal = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-black'} bg-opacity-50`}>
      <div className={`max-w-md w-full mx-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>User Profile</h2>
          <button
            onClick={() => setShowUserProfile(false)}
            className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className={`flex items-center p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
            <div className="w-12 h-12 bg-rwanda-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user?.name}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user?.email}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Member since {user?.joinDate}</p>
            </div>
          </div>

          <div className="space-y-2">
            <button className={`w-full text-left p-3 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} transition-colors`}>
              ⚙️ Settings
            </button>
            <button className={`w-full text-left p-3 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} transition-colors`}>
              📋 My Orders
            </button>
            <button className={`w-full text-left p-3 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} transition-colors`}>
              ❓ Help
            </button>
            <button className={`w-full text-left p-3 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} transition-colors`}>
              🎧 Customer Support
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  // Detail Page Component
  const DetailPage = () => (
    <div className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} overflow-y-auto`}>
      <div className="min-h-screen">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => setShowDetailPage(false)}
              className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              ← Back to listings
            </button>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {selectedDetailPlace?.name}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <img 
                src={selectedDetailPlace?.image} 
                alt={selectedDetailPlace?.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
              <div className="flex justify-between items-start mb-4">
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {selectedDetailPlace?.name}
                </h2>
                <div 
                  className="flex items-center cursor-pointer"
                  onMouseEnter={() => setHoveredRating(selectedDetailPlace?.id)}
                  onMouseLeave={() => setHoveredRating(null)}
                >
                  <span className="mr-2">
                    {getRatingEmojis(selectedDetailPlace?.rating, hoveredRating === selectedDetailPlace?.id)}
                  </span>
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>
                    {selectedDetailPlace?.rating}
                  </span>
                </div>
              </div>

              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                📍 {selectedDetailPlace?.address}
              </p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                📞 {selectedDetailPlace?.phone}
              </p>
              
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-6`}>
                {selectedDetailPlace?.description}
              </p>

              <div className="mb-6">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
                  Services Offered
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDetailPlace?.services?.map((service, index) => (
                    <div key={index} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      ✓ {service}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
                  Pricing
                </h3>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
                  <div className="flex justify-between mb-2">
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>USD:</span>
                    <span className={`font-semibold ${darkMode ? 'text-rwanda-yellow' : 'text-rwanda-blue'}`}>
                      ${selectedDetailPlace?.detailedPricing?.usd}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>RWF:</span>
                    <span className={`font-semibold ${darkMode ? 'text-rwanda-yellow' : 'text-rwanda-blue'}`}>
                      {selectedDetailPlace?.detailedPricing?.rwf} FRW
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => openBookingModal(selectedDetailPlace)}
                  className="flex-1 bg-rwanda-blue text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  📅 Book Now
                </button>
                <button
                  onClick={() => getDirections(selectedDetailPlace)}
                  className="flex-1 bg-rwanda-green text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  🗺️ Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Booking Modal Component (updated)
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
              {[
                { value: 'card', label: '💳 Credit/Debit Card' },
                { value: 'paypal', label: '🟦 PayPal' },
                { value: 'mobile', label: '📱 Mobile Money' },
                { value: 'visa', label: '🔵 Visa' }
              ].map(option => (
                <label key={option.value} className={`flex items-center p-3 border rounded-lg cursor-pointer payment-option ${
                  darkMode ? 'border-gray-600 hover:border-rwanda-blue' : 'border-gray-300 hover:border-rwanda-blue'
                }`}>
                  <input type="radio" name="payment" value={option.value} className="mr-3" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{option.label}</span>
                </label>
              ))}
            </div>

            <div className={`${darkMode ? 'bg-purple-900' : 'bg-rwanda-yellow'} bg-opacity-20 p-4 rounded-lg mb-4`}>
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

  if (showDetailPage) {
    return <DetailPage />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800' 
        : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`${
        darkMode 
          ? 'bg-gradient-to-r from-gray-800 via-purple-800 to-gray-700' 
          : 'bg-white'
      } shadow-md`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className={`text-2xl font-bold ${darkMode ? 'rwanda-text-dark' : 'rwanda-text'}`}>
              Rwanda Discovery
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-700 to-pink-700 text-yellow-300 hover:from-purple-600 hover:to-pink-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            <button
              onClick={() => setShowUserProfile(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-purple-700 text-purple-100 hover:bg-purple-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="w-8 h-8 bg-rwanda-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm">Welcome, {user?.name}!</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Enhanced Video Background */}
      <div className="hero-section relative h-96 bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1643727921394-2b6063f6a854" 
            alt="Rwanda Nature Video"
            className="w-full h-full object-cover transition-transform duration-20000 hover:scale-105"
          />
          <div className="nature-overlay absolute inset-0"></div>
        </div>
        <div className={`absolute inset-0 ${
          darkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-40'
        }`}></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className={`text-5xl font-bold mb-4 ${darkMode ? 'rwanda-text-dark' : 'rwanda-text-light'}`}>
            Discover Rwanda
          </h1>
          <p className="text-xl mb-8 max-w-2xl">Find hotels, restaurants, travel agencies, and events near you in the Land of a Thousand Hills</p>
          
          <div className="w-full max-w-2xl">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search places, restaurants, hotels..."
                className="flex-1 px-6 py-4 text-gray-800 text-lg focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className={`px-8 py-4 text-white font-semibold transition-colors ${
                darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-rwanda-blue hover:bg-blue-700'
              }`}>
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
                    ? darkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-rwanda-blue text-white shadow-lg'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-rwanda-yellow hover:text-gray-800 shadow-md'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* High Rated Sections */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? 'rwanda-text-dark' : 'rwanda-text'
          }`}>
            ⭐ High Rated Favorites
          </h2>
          
          {['hotel', 'restaurant', 'travel'].map(category => {
            const highRated = getHighRatedPlaces(category);
            if (highRated.length === 0) return null;
            
            return (
              <div key={category} className="mb-8">
                <h3 className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-purple-300' : 'text-rwanda-blue'
                }`}>
                  {category === 'hotel' ? '🏨 Top Hotels' : 
                   category === 'restaurant' ? '🍽️ Best Restaurants' : 
                   '✈️ Premier Travel Agencies'}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {highRated.slice(0, 3).map(place => {
                    const distance = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng) : null;
                    const travelTime = distance ? calculateTravelTime(distance) : null;
                    
                    return (
                      <div key={place.id} className={`${
                        darkMode ? 'bg-gradient-to-br from-gray-800 to-purple-900' : 'bg-white'
                      } rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-rwanda-yellow`}>
                        <img src={place.image} alt={place.name} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              {place.name}
                            </h4>
                            <div 
                              className="flex items-center cursor-pointer"
                              onMouseEnter={() => setHoveredRating(place.id)}
                              onMouseLeave={() => setHoveredRating(null)}
                            >
                              <span className="mr-1">
                                {getRatingEmojis(place.rating, hoveredRating === place.id)}
                              </span>
                              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {place.rating}
                              </span>
                            </div>
                          </div>
                          
                          {travelTime && (
                            <p className={`text-xs ${darkMode ? 'text-purple-300' : 'text-rwanda-green'} mb-2`}>
                              📍 {distance.toFixed(1)} km • 🕒 {travelTime}
                            </p>
                          )}
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => place.website ? window.open(place.website, '_blank') : openDetailPage(place)}
                              className={`flex-1 text-xs py-2 px-2 rounded transition-colors ${
                                darkMode 
                                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                                  : 'bg-rwanda-blue text-white hover:bg-blue-700'
                              }`}
                            >
                              {place.website ? '🌐 Website' : '📋 Details'}
                            </button>
                            <button
                              onClick={() => openBookingModal(place)}
                              className={`flex-1 text-xs py-2 px-2 rounded transition-colors ${
                                darkMode 
                                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700' 
                                  : 'bg-rwanda-yellow text-gray-800 hover:bg-yellow-500'
                              }`}
                            >
                              📅 Book
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* All Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPlaces.map(place => {
            const distance = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng) : null;
            const travelTime = distance ? calculateTravelTime(distance) : null;
            
            return (
              <div key={place.id} className={`${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-700' 
                  : 'bg-white'
              } rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}>
                <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {place.name}
                    </h3>
                    <div 
                      className="flex items-center cursor-pointer"
                      onMouseEnter={() => setHoveredRating(place.id)}
                      onMouseLeave={() => setHoveredRating(null)}
                    >
                      <span className="mr-1">
                        {getRatingEmojis(place.rating, hoveredRating === place.id)}
                      </span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {place.rating}
                      </span>
                    </div>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                    {place.address}
                  </p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-2 text-sm`}>
                    {place.description}
                  </p>
                  <p className={`font-semibold mb-4 ${
                    darkMode ? 'text-purple-300' : 'text-rwanda-blue'
                  }`}>
                    {place.priceRange}
                  </p>
                  
                  {travelTime && (
                    <div className={`p-3 rounded-lg mb-4 travel-time-badge ${
                      darkMode 
                        ? 'bg-purple-900 bg-opacity-50' 
                        : 'bg-gray-100'
                    }`}>
                      <p className={`text-sm ${darkMode ? 'text-purple-200' : 'text-gray-700'}`}>
                        📍 {distance.toFixed(1)} km away • 🕒 {travelTime} travel time
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => getDirections(place)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        darkMode 
                          ? 'bg-green-700 text-white hover:bg-green-600' 
                          : 'bg-rwanda-green text-white hover:bg-green-700'
                      }`}
                    >
                      🗺️ Directions
                    </button>
                    <button
                      onClick={() => openBookingModal(place)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        darkMode 
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700' 
                          : 'bg-rwanda-yellow text-gray-800 hover:bg-yellow-500'
                      }`}
                    >
                      📅 Book Now
                    </button>
                    <button
                      onClick={() => place.website ? window.open(place.website, '_blank') : openDetailPage(place)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        darkMode 
                          ? 'bg-blue-700 text-white hover:bg-blue-600' 
                          : 'bg-rwanda-blue text-white hover:bg-blue-700'
                      }`}
                    >
                      {place.website ? '🌐 Website' : '📋 Details'}
                    </button>
                    <a
                      href={`tel:${place.phone}`}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
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
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? 'rwanda-text-dark' : 'rwanda-text'
          }`}>
            🎉 Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => {
              const distance = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, event.coordinates.lat, event.coordinates.lng) : null;
              const travelTime = distance ? calculateTravelTime(distance) : null;
              
              return (
                <div key={event.id} className={`${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-purple-900' 
                    : 'bg-white'
                } rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  event.isTrending ? 'border-2 border-yellow-400' : ''
                }`}>
                  {event.isTrending && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-center py-1 text-sm font-bold">
                      🔥 TRENDING NOW!
                    </div>
                  )}
                  <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {event.name}
                    </h3>
                    <p className={`mb-2 ${darkMode ? 'text-purple-300' : 'text-rwanda-blue'}`}>
                      📅 {event.date}
                    </p>
                    <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      📍 {event.venue}
                    </p>
                    <p className={`mb-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                      {event.description}
                    </p>
                    <p className={`font-semibold mb-4 ${
                      darkMode ? 'text-purple-300' : 'text-rwanda-blue'
                    }`}>
                      {event.priceRange}
                    </p>
                    
                    {travelTime && (
                      <div className={`p-3 rounded-lg mb-4 ${
                        darkMode 
                          ? 'bg-purple-900 bg-opacity-50' 
                          : 'bg-gray-100'
                      }`}>
                        <p className={`text-sm ${darkMode ? 'text-purple-200' : 'text-gray-700'}`}>
                          📍 {distance.toFixed(1)} km away • 🕒 {travelTime} travel time
                        </p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openBookingModal(event)}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                          darkMode 
                            ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700' 
                            : 'bg-rwanda-green text-white hover:bg-green-700'
                        }`}
                      >
                        📅 Book Ticket
                      </button>
                      <button
                        onClick={() => getDirections(event)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        🗺️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`${
          darkMode 
            ? 'bg-gradient-to-r from-purple-800 via-pink-800 to-purple-900' 
            : 'bg-gradient-to-r from-rwanda-blue to-rwanda-green'
        } text-white py-12 rounded-lg mb-8`}>
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
      <footer className={`${
        darkMode 
          ? 'bg-gradient-to-r from-gray-900 to-purple-900' 
          : 'bg-gray-800'
      } text-white py-8`}>
        <div className="container mx-auto px-4 text-center">
          <h3 className={`text-2xl font-bold mb-4 ${
            darkMode ? 'rwanda-text-dark' : 'rwanda-text-light'
          }`}>
            Rwanda Discovery
          </h3>
          <p className="text-gray-300 mb-4">Your gateway to exploring the Land of a Thousand Hills</p>
          
          {/* Contact Information */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <div className="flex justify-center gap-6 text-sm">
              <a href="tel:0786654335" className="hover:text-rwanda-yellow transition-colors">
                📞 0786654335
              </a>
              <a href="mailto:rwa9@gmail.com" className="hover:text-rwanda-yellow transition-colors">
                ✉️ rwa9@gmail.com
              </a>
            </div>
          </div>
          
          <p className="text-gray-400">&copy; 2025 Rwanda Discovery. All rights reserved.</p>
        </div>
      </footer>

      {/* Trending Event Popup */}
      {showTrendingPopup && <TrendingPopup />}

      {/* User Profile Modal */}
      {showUserProfile && <UserProfileModal />}

      {/* Booking Modal */}
      {showBookingModal && <BookingModal />}
    </div>
  );
};

export default App;