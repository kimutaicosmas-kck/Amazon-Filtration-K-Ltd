
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProductForm from "./AdminProductForm"; // your form component

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productsPerPage] = useState(20); // 20 products per page
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Fix double /media/ URLs
  const fixImageUrl = (url) => {
    if (!url) return url;
    return url.replace('/media/media/', '/media/');
  };

  // ✅ Fetch products from Django API with pagination and search
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        page_size: productsPerPage.toString()
      });
      
      // Add category filter if not 'All'
      if (selectedCategory !== 'All') {
        params.append('category', selectedCategory);
      }
      
      // Add search term if provided
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }
      
      // Try multiple API endpoints
      const apiEndpoints = [
        `https://amazonfiltration.co.ke/backend/api/products/?${params}`,
        `http://amazonfiltration.co.ke/backend/api/products/?${params}`,
        `https://amazonfiltration.co.ke/api/products/?${params}`,
        `http://amazonfiltration.co.ke/api/products/?${params}`
      ];
      
      let res = null;
      for (const endpoint of apiEndpoints) {
        try {
          res = await fetch(endpoint);
          if (res.ok) {
            break;
          }
        } catch (error) {
          continue;
        }
      }
      
      if (!res || !res.ok) {
        throw new Error('API not available. Please ensure the backend is running.');
      }
      
      const data = await res.json();
      
      if (data.results) {
        setProducts(data.results);
        setTotalPages(Math.ceil(data.count / productsPerPage));
        setTotalProducts(data.count);
      } else {
        setProducts(data);
        setTotalPages(1);
        setTotalProducts(data.length);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('adminAuth');
      if (!authData) {
        navigate('/admin');
        return;
      }
      
      try {
        const session = JSON.parse(authData);
        const now = Date.now();
        const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
        
        if (!session.authenticated || (now - session.timestamp) > sessionTimeout) {
          localStorage.removeItem('adminAuth');
          navigate('/admin');
          return;
        }
      } catch (error) {
        localStorage.removeItem('adminAuth');
        navigate('/admin');
        return;
      }
    };
    
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, searchTerm, productsPerPage]);

  // Auto-refresh every 30 seconds (only when not editing)
  useEffect(() => {
    if (editingProduct) {
      return;
    }
    
    const interval = setInterval(() => {
      fetchProducts();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [editingProduct]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };


  // ✅ Add or update product
  const handleSave = async (product, isEdit = false) => {
    const formData = new FormData();
    
    // Handle regular fields
    Object.keys(product).forEach((key) => {
      if (product[key] !== null && product[key] !== undefined && key !== 'image') {
        formData.append(key, product[key]);
      }
    });

    // Handle image file specially
    if (product.image instanceof File) {
      formData.append('image', product.image);
      console.log('Image file added to FormData:', product.image.name);
    } else if (product.image && typeof product.image === 'string') {
      // If it's a string (base64 or URL), skip it for now
      console.log('Skipping non-file image:', typeof product.image);
    }

    try {
      // Use the PHP endpoint that supports POST (createProduct)
      let url = '/products.php';
      let method = 'POST';
      
      // If updating, allow backend to detect by id if provided
      if (isEdit && product.id) {
        url = `/products.php?id=${product.id}`;
        method = 'POST';
      }

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) {
        let errorData = null;
        try { errorData = await res.json(); } catch (_) {}
        console.error('Save failed', errorData || res.statusText);
        return;
      }

      const savedProduct = await res.json();
      console.log('Product saved successfully:', savedProduct);
      
      await fetchProducts(); // refresh list
      setEditingProduct(null); // close form
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.error("Delete failed", await res.json());
        return;
      }
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-end gap-2 mb-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
          <button
            onClick={() =>
              setEditingProduct({
                name: "",
                code: "",
                category: "",
                series: "",
                price: "",
                status: "Active",
                description: "",
                image: null,
              })
            }
            className="w-full sm:w-auto bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Product
          </button>
        </div>
        {editingProduct ? (
          <AdminProductForm
            product={editingProduct}
            onSave={(p) => handleSave(p, !!editingProduct.id)}
            onCancel={() => setEditingProduct(null)}
          />
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Products</p>
                    <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.status === 'Active').length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Categories</p>
                    <p className="text-2xl font-bold text-gray-900">{new Set(products.map(p => p.category)).size}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      Ksh {products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name, code, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="lg:w-64">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="All">All Categories</option>
                    <option value="Air Filters">Air Filters</option>
                    <option value="Fuel Filters">Fuel Filters</option>
                    <option value="Oil Filters">Oil Filters</option>
                    <option value="Hydraulic Return Filters">Hydraulic Return Filters</option>
                    <option value="Coolant Filters">Coolant Filters</option>
                    <option value="Cabin Filters">Cabin Filters</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedCategory !== 'All') && (
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                      }}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Results Info */}
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-600">
                <p>
                  Showing {products.length} of {totalProducts} products
                  {searchTerm && ` matching "${searchTerm}"`}
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </p>
                <p className="mt-1 sm:mt-0">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedProducts.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <span className="text-sm font-medium text-blue-800">
                      {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        // Bulk activate
                        console.log('Bulk activate:', selectedProducts);
                      }}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => {
                        // Bulk deactivate
                        console.log('Bulk deactivate:', selectedProducts);
                      }}
                      className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    >
                      Deactivate
                    </button>
                    <button
                      onClick={() => {
                        // Bulk delete
                        console.log('Bulk delete:', selectedProducts);
                      }}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setSelectedProducts([])}
                      className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid - Mobile Card Layout */}
            {products.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Get started by adding your first product.</p>
                <button
                  onClick={() =>
                    setEditingProduct({
                      name: "",
                      code: "",
                      category: "",
                      series: "",
                      price: "",
                      status: "Active",
                      description: "",
                      image: null,
                    })
                  }
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Add Your First Product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    {/* Selection Checkbox */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProducts([...selectedProducts, product.id]);
                            } else {
                              setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                            }
                          }}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          Select for bulk actions
                        </label>
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-t-lg overflow-hidden">
                      {product.image ? (
                        <img
                          src={fixImageUrl(product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000${product.image}`)}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      {/* Fallback when image fails to load */}
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      {/* Default placeholder when no image */}
                      {!product.image && (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          product.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">Code: {product.code || 'N/A'}</p>
                      <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
                      <p className="text-lg font-bold text-gray-900 mb-4">Ksh {product.price ? parseFloat(product.price).toLocaleString() : '0'}</p>
                      
                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
