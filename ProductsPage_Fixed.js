import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, X } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');

  const categories = ['All', 'Air Filters', 'Fuel Filters', 'Oil Filters', 'Hydraulic Return Filters', 'Coolant Filters', 'Cabin Filters'];

  // Image modal functions
  const handleImageClick = (imageUrl, productName) => {
    setSelectedImage(imageUrl);
    setSelectedProductName(productName);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage('');
    setSelectedProductName('');
  };

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load products - Use static data for immediate display
  useEffect(() => {
    const loadProducts = () => {
      setLoading(true);
      
      // Static product data for immediate display
      const staticProducts = [
        {
          id: 1,
          name: "Air Filter 20000 Series",
          category: "Air Filters",
          description: "Heavy-duty air filter designed to provide superior filtration for commercial vehicles and industrial applications.",
          price: 2500,
          code: "21010",
          image: "/images/Air-Filters.jpeg",
          specifications: "Part Number: 21010\nFilter Type: Dry element\nEfficiency: 99.5%\nDimensions: 8\" x 6\" x 2\"",
          applications: "Commercial vehicles, Industrial machinery, Construction equipment"
        },
        {
          id: 2,
          name: "Fuel Filter 30000 Series",
          category: "Fuel Filters",
          description: "High-performance fuel filter ensuring clean fuel delivery and engine protection.",
          price: 1800,
          code: "31010",
          image: "/images/Fuel-Filter.jpeg",
          specifications: "Part Number: 31010\nFilter Type: Fuel element\nEfficiency: 99.9%\nDimensions: 4\" x 3\" x 1.5\"",
          applications: "Diesel engines, Gasoline engines, Marine applications"
        },
        {
          id: 3,
          name: "Oil Filter 50000 Series",
          category: "Oil Filters",
          description: "Premium oil filter for maximum engine protection and extended service intervals.",
          price: 1200,
          code: "51010",
          image: "/images/Oil-Filter.jpeg",
          specifications: "Part Number: 51010\nFilter Type: Oil element\nEfficiency: 99.8%\nDimensions: 3.5\" x 2.5\" x 1\"",
          applications: "Automotive engines, Industrial machinery, Power generation"
        },
        {
          id: 4,
          name: "Hydraulic Return Filter 80000 Series",
          category: "Hydraulic Return Filters",
          description: "Heavy-duty hydraulic filter for hydraulic systems requiring maximum protection.",
          price: 3500,
          code: "81010",
          image: "/images/Hydraulic-Return-Filter.jpeg",
          specifications: "Part Number: 81010\nFilter Type: Hydraulic element\nEfficiency: 99.7%\nDimensions: 6\" x 4\" x 2.5\"",
          applications: "Hydraulic systems, Construction equipment, Mining machinery"
        },
        {
          id: 5,
          name: "Coolant Filter 60000 Series",
          category: "Coolant Filters",
          description: "Advanced coolant filter for engine cooling system protection and maintenance.",
          price: 2200,
          code: "61010",
          image: "/images/Coolant-Filter.jpeg",
          specifications: "Part Number: 61010\nFilter Type: Coolant element\nEfficiency: 99.6%\nDimensions: 5\" x 3.5\" x 1.8\"",
          applications: "Engine cooling systems, Industrial cooling, Marine engines"
        },
        {
          id: 6,
          name: "Cabin Filter 70000 Series",
          category: "Cabin Filters",
          description: "Premium cabin air filter for clean air circulation in vehicle cabins.",
          price: 1500,
          code: "71010",
          image: "/images/Cabin-Filter.jpeg",
          specifications: "Part Number: 71010\nFilter Type: Cabin element\nEfficiency: 99.4%\nDimensions: 8\" x 6\" x 1\"",
          applications: "Vehicle cabins, HVAC systems, Air conditioning"
        }
      ];

      // Filter products based on category and search
      let filteredProducts = staticProducts;
      
      if (selectedCategory !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
      }
      
      if (debouncedSearchTerm.trim()) {
        const searchTerm = debouncedSearchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.code.toLowerCase().includes(searchTerm)
        );
      }

      setProducts(filteredProducts);
      setLoading(false);
    };

    loadProducts();
  }, [selectedCategory, debouncedSearchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => handleImageClick(product.image, product.name)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-product.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-2">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-primary-600 font-medium mb-2">Code: {product.code}</p>
                    <p className="text-xl font-bold text-gray-800 mb-3">Ksh {product.price.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                    <Link to={`/products/${product.id}`} className="btn-primary-sm flex items-center justify-center">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {products.length} products
              </p>
            </div>
          </>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Our extensive catalog has many more products. Contact us for specific inquiries or custom solutions.
          </p>
          <Link to="/contact" className="btn-secondary-light">
            Request a Quote <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10 shadow-lg"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <div className="bg-white rounded-lg p-4 max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{selectedProductName}</h3>
              <img
                src={selectedImage}
                alt={selectedProductName}
                className="max-w-full max-h-96 object-contain rounded-lg"
                onClick={closeImageModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
