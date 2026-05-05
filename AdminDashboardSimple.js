import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import AdminProductForm from './AdminProductForm';

const AdminDashboardSimple = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Show 10 products per page in admin

  const categories = ['All', 'Air Filters', 'Fuel Filters', 'Oil Filters', 'Hydraulic Filters', 'Coolant Filters', 'Cabin Filters'];

  // Load products from PHP API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/backend-php/api/products.php');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setProducts(data.products || []);
            console.log('Products loaded from PHP API:', data.products?.length || 0);
          } else {
            console.log('API returned error:', data.error);
            setProducts([]);
          }
        } else {
          console.log('API not responding');
          setProducts([]);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalFilteredProducts = filteredProducts.length;
  const totalPagesFiltered = Math.ceil(totalFilteredProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        console.log('Deleting product with ID:', id);
        
        // Delete from PHP API
        const response = await fetch(`/backend-php/api/products.php/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            // Update local state
            setProducts(products.filter(p => p.id !== id));
            console.log('Product deleted successfully');
            
            // Show success message
            alert('Product deleted successfully!');
            
            // Force refresh the page to ensure frontend updates
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            throw new Error(result.error || 'Failed to delete product');
          }
        } else {
          throw new Error('Failed to delete product');
        }
        
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      let response;
      
      // Helper: convert data URL to Blob
      const dataUrlToBlob = (dataUrl) => {
        const [meta, base64] = dataUrl.split(',');
        const mimeMatch = meta.match(/data:(.*?);base64/);
        const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
        return new Blob([bytes], { type: mime });
      };

      const sendAsFormData = async (url, method, data) => {
        const formData = new FormData();
        
        // Add all product data to FormData
        console.log('Product data being sent:', productData);
        Object.keys(productData).forEach(key => {
          if (key === 'image') {
            const value = productData[key];
            if (value instanceof File) {
              console.log('Adding image File to FormData:', value);
              formData.append('image', value);
            } else if (typeof value === 'string' && value.startsWith('data:image/')) {
              // Convert data URL to Blob so PHP gets it in $_FILES
              try {
                const blob = dataUrlToBlob(value);
                const mime = blob.type || 'image/jpeg';
                const ext = mime.split('/')[1] || 'jpg';
                const filename = `${(productData.code || 'product').toString().replace(/[^a-zA-Z0-9_-]/g, '')}_${Date.now()}.${ext}`;
                console.log('Converting data URL to Blob and appending as:', filename, mime);
                formData.append('image', blob, filename);
              } catch (e) {
                console.warn('Failed to convert data URL to Blob, skipping image:', e);
              }
            } else if (typeof value === 'string' && value) {
              // If it’s an existing path/URL, include it as a normal field so backend can keep it
              formData.append('image', value);
            }
          } else {
            formData.append(key, productData[key]);
          }
        });
        
        // Debug: Log FormData contents
        console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        return fetch(url, { method, body: formData });
      };

      if (editingProduct) {
        // Update existing product via POST ?id= to allow multipart
        response = await sendAsFormData(`/backend-php/api/products.php?id=${editingProduct.id}`, 'POST', productData);
      } else {
        // Add new product via multipart
        response = await sendAsFormData('/backend-php/api/products.php', 'POST', productData);
      }
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Reload products from API
          const productsResponse = await fetch('/backend-php/api/products.php');
          if (productsResponse.ok) {
            const productsData = await productsResponse.json();
            if (productsData.success) {
              setProducts(productsData.products || []);
            }
          }
          
          setShowForm(false);
          setEditingProduct(null);
          console.log('Product saved successfully');
        } else {
          throw new Error(result.error || 'Failed to save product');
        }
      } else {
        throw new Error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };


  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const fixImageUrl = (url) => {
    if (!url) return url;
    // Handle PHP backend image paths
    if (url.startsWith('uploads/')) {
      return `/backend-php/${url}`;
    }
    // Handle Django double media issue
    if (url.includes('/media/media/')) {
      return url.replace('/media/media/', '/media/');
    }
    // Handle absolute URLs
    if (url.startsWith('http')) {
      return url;
    }
    // Default fallback
    return url;
  };

  if (showForm) {
    return (
      <AdminProductForm
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={handleCancel}
      />
    );
  }

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddProduct}
            className="btn-primary flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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

        {/* Products Table */}
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
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={fixImageUrl(product.image)}
                              alt={product.name}
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjhmOWZhIi8+CjxyZWN0IHg9IjE1MCIgeT0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNmM3NTdkIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmM3NTdkIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Ksh {product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPagesFiltered > 1 && (
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {startIndex + 1}-{Math.min(endIndex, totalFilteredProducts)} of {totalFilteredProducts} products
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                      {Array.from({ length: totalPagesFiltered }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPagesFiltered))}
                      disabled={currentPage === totalPagesFiltered}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        currentPage === totalPagesFiltered
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            {totalPagesFiltered <= 1 && (
              <div className="bg-gray-50 px-6 py-3">
                <div className="text-sm text-gray-500">
                  Showing {totalFilteredProducts} of {products.length} products
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardSimple;
