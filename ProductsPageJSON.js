import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, X } from 'lucide-react';

const ProductsPageJSON = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); // Show 12 products per page

  const categories = ['All', 'Air Filters', 'Fuel Filters', 'Oil Filters', 'Hydraulic Filters', 'Coolant Filters', 'Cabin Filters'];

  // Load products from JSON file
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from JSON file
        const response = await fetch('/data/products.json');
        
        if (response.ok) {
          const data = await response.json();
          console.log('JSON file loaded:', data);
          
          if (data && data.products && Array.isArray(data.products)) {
            setProducts(data.products);
            console.log(`Products loaded from JSON file: ${data.products.length}`);
            return;
          }
        }
        
        // Fallback to sample data
        console.log('Using fallback sample data');
        const sampleProducts = [
          {
            id: 1,
            name: "Air Filter",
            code: "AF-17801-XL",
            category: "Air Filters",
            price: 2500.00,
            description: "Heavy-duty cylindrical air filter designed for trucks and industrial engines.",
            image: "/images/Air-Filters.jpeg",
            applications: "Trucks, Industrial Engines",
            specifications: "Part Number: AF-17801-XL\nFilter Type: Dry element",
            status: "Active"
          },
          {
            id: 2,
            name: "Air Filter",
            code: "AF-17801-MD",
            category: "Air Filters",
            price: 3500.00,
            description: "Durable round air filter ideal for trucks and heavy-duty vehicles.",
            image: "/images/Air-Filters.jpeg",
            applications: "Trucks, Heavy-duty Vehicles",
            specifications: "Part Number: AF-17801-MD\nFilter Type: Dry element",
            status: "Active"
          },
          {
            id: 3,
            name: "Fuel Filter",
            code: "FF-12345",
            category: "Fuel Filters",
            price: 1800.00,
            description: "High-efficiency fuel filter for diesel engines.",
            image: "/images/Fuel-Filter.jpg",
            applications: "Diesel Engines",
            specifications: "Part Number: FF-12345\nFilter Type: Fuel element",
            status: "Active"
          },
          {
            id: 4,
            name: "Oil Filter",
            code: "OF-67890",
            category: "Oil Filters",
            price: 1200.00,
            description: "Premium oil filter for automotive applications.",
            image: "/images/Oil-Filter.jpg",
            applications: "Automotive",
            specifications: "Part Number: OF-67890\nFilter Type: Oil element",
            status: "Active"
          }
        ];
        
        setProducts(sampleProducts);
        
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Error loading products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.applications && product.applications.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleImageClick = (image, productName) => {
    setSelectedImage(image);
    setSelectedProductName(productName);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage('');
    setSelectedProductName('');
  };

  const fixImageUrl = (url) => {
    if (!url) return url;
    return url.replace('/media/media/', '/media/');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => handleImageClick(product.image, product.name)}
                  >
                    <img
                      src={fixImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-product.jpg';
                      }}
                    />
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 border rounded-md text-sm font-medium ${
                        currentPage === page
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                {products.length === 0 && (
                  <span className="block mt-2 text-red-600">
                    No products found. Add products through the admin panel.
                  </span>
                )}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{selectedProductName}</h3>
              <button
                onClick={closeImageModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={fixImageUrl(selectedImage)}
                alt={selectedProductName}
                className="w-full h-auto max-h-96 object-contain"
                onError={(e) => {
                  e.target.src = '/images/placeholder-product.jpg';
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPageJSON;
