import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Package, 
  FileText, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import AdminProductForm from './AdminProductForm';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('adminProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize with real Amazon Filter products
      const sampleProducts = [
        {
          id: 1,
          name: 'Cylindrical Air Filter',
          code: '8-94156-052-0',
          category: 'Air Filters',
          series: '20000',
          price: 4500,
          description: 'Heavy-duty cylindrical air filter with metal mesh casing and pleated filtration media. Designed for industrial and automotive applications requiring high airflow and superior filtration.',
          image: 'https://via.placeholder.com/400x300/1e40af/ffffff?text=Cylindrical+Air+Filter',
          specifications: 'Cylindrical design, Metal mesh casing, Pleated media, High airflow capacity',
          applications: 'Industrial machinery, automotive engines, heavy equipment',
          status: 'Active',
          createdAt: '2025-01-19T10:00:00Z',
          updatedAt: '2025-01-19T10:00:00Z'
        },
        {
          id: 2,
          name: 'Amazon Filter 17801 20040',
          code: '17801-20040',
          category: 'Air Filters',
          series: '20000',
          price: 3200,
          description: 'Rectangular cabin air filter with pleated design for maximum surface area. Provides clean air filtration for passenger comfort and engine protection.',
          image: 'https://via.placeholder.com/400x300/1e40af/ffffff?text=Cylindrical+Air+Filter',
          specifications: 'Rectangular design, Pleated media, High efficiency, Durable construction',
          applications: 'Cabin air filtration, HVAC systems, passenger vehicles',
          status: 'Active',
          createdAt: '2025-01-18T10:00:00Z',
          updatedAt: '2025-01-18T10:00:00Z'
        },
        {
          id: 3,
          name: 'Amazon Filter 17801 22020',
          code: '17801-22020',
          category: 'Air Filters',
          series: '20000',
          price: 3800,
          description: 'Premium rectangular air filter with enhanced pleated design. Engineered for superior filtration performance and extended service life.',
          image: 'https://via.placeholder.com/400x300/1e40af/ffffff?text=Cylindrical+Air+Filter',
          specifications: 'Enhanced pleated design, Premium filtration media, Extended service life',
          applications: 'Automotive engines, industrial air systems, commercial vehicles',
          status: 'Active',
          createdAt: '2025-01-17T10:00:00Z',
          updatedAt: '2025-01-17T10:00:00Z'
        },
        {
          id: 4,
          name: 'Heavy Duty Oil Filter',
          code: '51010',
          category: 'Oil Filters',
          series: '50000',
          price: 2800,
          description: 'High-performance spin-on oil filter designed for heavy-duty engines. Provides superior filtration and extended service life.',
          image: 'https://via.placeholder.com/400x300/1e40af/ffffff?text=Cylindrical+Air+Filter',
          specifications: 'Spin-on design, Heavy-duty construction, High filtration efficiency',
          applications: 'Diesel engines, heavy machinery, commercial vehicles',
          status: 'Active',
          createdAt: '2025-01-16T10:00:00Z',
          updatedAt: '2025-01-16T10:00:00Z'
        },
        {
          id: 5,
          name: 'Diesel Fuel Filter',
          code: '31010',
          category: 'Fuel Filters',
          series: '30000',
          price: 4200,
          description: 'Advanced diesel fuel filter with water separation capability. Protects fuel injection systems from contamination and water damage.',
          image: 'https://via.placeholder.com/400x300/1e40af/ffffff?text=Primary+Diesel+Fuel+Filter',
          specifications: 'Water separation: 95%, Filtration: 10 microns, Pressure: 4 bar',
          applications: 'Diesel engines, generators, marine engines, heavy equipment',
          status: 'Active',
          createdAt: '2025-01-15T10:00:00Z',
          updatedAt: '2025-01-15T10:00:00Z'
        },
        {
          id: 6,
          name: 'Hydraulic Return Filter',
          code: '81010',
          category: 'Hydraulic Return Filters',
          series: '80000',
          price: 5500,
          description: 'High-pressure hydraulic return filter for hydraulic systems. Maintains system cleanliness and protects hydraulic components.',
          image: '/images/hydraulic-return-filter.jpg',
          specifications: 'High-pressure rating, Return line filtration, System protection',
          applications: 'Hydraulic systems, construction equipment, industrial machinery',
          status: 'Active',
          createdAt: '2025-01-14T10:00:00Z',
          updatedAt: '2025-01-14T10:00:00Z'
        }
      ];
      setProducts(sampleProducts);
      localStorage.setItem('adminProducts', JSON.stringify(sampleProducts));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? productData : p
      );
      setProducts(updatedProducts);
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    } else {
      // Add new product
      const newProducts = [...products, productData];
      setProducts(newProducts);
      localStorage.setItem('adminProducts', JSON.stringify(newProducts));
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats based on actual data
  const stats = [
    { name: 'Total Products', value: products.length.toString(), icon: Package, change: '+12%', changeType: 'positive' },
    { name: 'Active Products', value: products.filter(p => p.status === 'Active').length.toString(), icon: Package, change: '+3%', changeType: 'positive' },
    { name: 'Contact Requests', value: '8', icon: MessageSquare, change: '+3%', changeType: 'positive' },
    { name: 'Testimonials', value: '15', icon: Star, change: '+8%', changeType: 'positive' },
  ];

  const recentProducts = products.slice(0, 4).map(product => ({
    id: product.id,
    name: product.name,
    category: product.category,
    status: product.status,
    date: new Date(product.createdAt).toISOString().split('T')[0]
  }));

  const recentContacts = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Interested in oil filters', date: '2025-01-19' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Need hydraulic filters', date: '2025-01-18' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', message: 'Bulk order inquiry', date: '2025-01-17' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Products</h3>
            <div className="space-y-3">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category} • {product.date}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Contacts</h3>
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="py-2 border-b border-gray-200 last:border-b-0">
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                  <p className="text-sm text-gray-600 mt-1">{contact.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{contact.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
        <button 
          onClick={handleAddProduct}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <button className="ml-4 btn-outline flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">Code: {product.code}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : product.status === 'Inactive'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Ksh {product.price?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
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
        </div>
      </div>
    </div>
  );

  // Show product form if needed
  if (showProductForm) {
    return (
      <AdminProductForm
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Amazon Filtration (K) Ltd</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'products', name: 'Products' },
            { id: 'contacts', name: 'Contacts' },
            { id: 'testimonials', name: 'Testimonials' },
            { id: 'settings', name: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'contacts' && <div>Contacts Management - Coming Soon</div>}
        {activeTab === 'testimonials' && <div>Testimonials Management - Coming Soon</div>}
        {activeTab === 'settings' && <div>Settings - Coming Soon</div>}
      </div>
    </div>
  );
};

export default AdminDashboard;
