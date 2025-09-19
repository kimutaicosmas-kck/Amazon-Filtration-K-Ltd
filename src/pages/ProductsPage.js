import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Download, Eye, MessageCircle } from 'lucide-react';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Oil', 'Fuel', 'Air', 'Hydraulic', 'Coolant', 'Cabin'];

  // Mock data - in real app, this would come from API
  const mockProducts = [
    {
      id: 1,
      name: 'Heavy Duty Oil Filter',
      category: 'Oil',
      description: 'High-performance oil filter designed for heavy-duty engines. Provides superior filtration and extended service life.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
      datasheet: '#'
    },
    {
      id: 2,
      name: 'Diesel Fuel Filter',
      category: 'Fuel',
      description: 'Advanced diesel fuel filter with water separation capability. Protects fuel injection systems from contamination.',
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop&crop=center',
      datasheet: '#'
    },
    {
      id: 3,
      name: 'Engine Air Filter',
      category: 'Air',
      description: 'High-efficiency air filter for engine intake systems. Ensures clean air supply for optimal engine performance.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
      datasheet: '#'
    },
    {
      id: 4,
      name: 'Hydraulic Return Filter',
      category: 'Hydraulic',
      description: 'High-pressure hydraulic return filter for hydraulic systems. Maintains system cleanliness and component protection.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center',
      datasheet: '#'
    },
    {
      id: 5,
      name: 'Coolant Filter',
      category: 'Coolant',
      description: 'Engine coolant filter for temperature regulation systems. Prevents corrosion and maintains cooling efficiency.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
      datasheet: '#'
    },
    {
      id: 6,
      name: 'Cabin Air Filter',
      category: 'Cabin',
      description: 'Premium cabin air filter for passenger comfort. Removes dust, pollen, and airborne contaminants.',
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop&crop=center',
      datasheet: '#'
    },
    {
      id: 7,
      name: 'Synthetic Oil Filter',
      category: 'Oil',
      description: 'Premium synthetic oil filter for high-performance engines. Extended service intervals and superior protection.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center',
      datasheet: '#'
    },
    {
      id: 8,
      name: 'Gasoline Fuel Filter',
      category: 'Fuel',
      description: 'High-flow gasoline fuel filter for fuel injection systems. Ensures clean fuel delivery and engine protection.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
      datasheet: '#'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our comprehensive range of high-quality filtration products designed for various industries and applications.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-500">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all products
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="aspect-w-16 aspect-h-12">
                      <img
                        src={product.image}
                        alt={`${product.name} - High-quality ${product.category.toLowerCase()} filter`}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x300/1e40af/ffffff?text=${encodeURIComponent(product.name)}`;
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {product.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button className="flex-1 btn-primary text-sm py-2 px-4 flex items-center justify-center">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <button className="flex-1 btn-outline text-sm py-2 px-4 flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Quote
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <button className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium">
                          <Download className="w-4 h-4 mr-2" />
                          Download Datasheet
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our technical team can help you find the perfect filtration solution for your specific needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Our Experts
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Custom Solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
