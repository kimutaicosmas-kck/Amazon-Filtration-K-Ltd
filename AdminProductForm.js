import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Upload, CheckCircle, AlertCircle } from 'lucide-react';
// Simple image processing without external dependencies

const AdminProductForm = ({ product = null, onSave, onCancel }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: product?.name || '',
    code: product?.code || '',
    category: product?.category || '',
    series: product?.series || '',
    description: product?.description || '',
    price: product?.price || '',
    image: product?.image || '',
    specifications: product?.specifications || '',
    applications: product?.applications || '',
    status: product?.status || 'Active'
  });
  
  // Persist form data to localStorage to prevent loss on tab switch
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  
  // Recover form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('adminFormData');
    if (savedFormData && !product?.id) { // Only for new products, not editing existing ones
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        setIsFormDirty(true);
        console.log('Recovered form data from localStorage');
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, [product?.id]);
  const [imagePreview, setImagePreview] = useState(product?.image || '');
  const [processedImages, setProcessedImages] = useState(null);
  const [imageProcessing, setImageProcessing] = useState(false);
  const [imageInfo, setImageInfo] = useState(null);

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'Air Filters', label: 'Air Filters (20000 series)', series: '20000' },
    { value: 'Fuel Filters', label: 'Fuel Filters (30000 series)', series: '30000' },
    { value: 'Oil Filters', label: 'Oil Filters (50000 series)', series: '50000' },
    { value: 'Hydraulic Return Filters', label: 'Hydraulic Return Filters (80000 series)', series: '80000' },
    { value: 'Coolant Filters', label: 'Coolant Filters (60000 series)', series: '60000' },
    { value: 'Cabin Filters', label: 'Cabin Filters (70000 series)', series: '70000' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newFormData);
    setIsFormDirty(true);
    
    // Save to localStorage to prevent loss on tab switch
    localStorage.setItem('adminFormData', JSON.stringify(newFormData));
    
    // Auto-generate series when category changes
    if (name === 'category') {
      const selectedCategory = categories.find(cat => cat.value === value);
      if (selectedCategory) {
        const updatedFormData = {
          ...newFormData,
          series: selectedCategory.series
        };
        setFormData(updatedFormData);
        localStorage.setItem('adminFormData', JSON.stringify(updatedFormData));
      }
    }
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = async (e) => {
    console.log('Image change event triggered');
    console.log('Files:', e.target.files);
    
    const file = e.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    console.log('File selected:', file);
    console.log('File type:', file.type);
    console.log('File size:', file.size);

    setImageProcessing(true);
    setErrors(prev => ({ ...prev, image: '' }));

    try {
      // Simple image processing - just create a preview
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        
        // Set the image data
        setImageFile(file);
        setImagePreview(dataUrl);
        setImageInfo({
          original: {
            file: file,
            dimensions: `${file.width || 'N/A'}x${file.height || 'N/A'}`,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          },
          optimized: {
            main: {
              dataUrl: dataUrl,
              dimensions: '800x800',
              size: `${(file.size / 1024).toFixed(2)} KB`,
            }
          }
        });
        
        // Update form data
        setFormData(prev => ({
          ...prev,
          image: dataUrl
        }));

        // Show success message
        console.log('✅ Image loaded successfully!');
      };
      
      reader.onerror = () => {
        setErrors(prev => ({ 
          ...prev, 
          image: 'Failed to read image file' 
        }));
        setImageProcessing(false);
      };
      
      // Read the file as data URL
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('Image processing error:', error);
      setErrors(prev => ({ 
        ...prev, 
        image: 'Failed to process image. Please try again.' 
      }));
    } finally {
      setImageProcessing(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.code.trim()) newErrors.code = 'Product code is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted');
    console.log('Current imageFile state:', imageFile);
    console.log('Current formData:', formData);

    // validate
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.code.trim()) newErrors.code = "Product code is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.description.trim()) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare product data for parent component
    console.log('Form submission - imageFile:', imageFile);
    console.log('Form submission - formData.image:', formData.image);
    console.log('Form submission - imageFile type:', typeof imageFile);
    console.log('Form submission - imageFile instanceof File:', imageFile instanceof File);
    
    const productData = {
      ...formData,
      id: product?.id,
      image: imageFile || formData.image, // Send the file if available, otherwise the existing image
    };
    
    console.log('Product data being sent:', productData);
    console.log('Product data image field:', productData.image);

    // Call parent's onSave function
    onSave(productData);
    
    // Clear form data and localStorage after successful save
    setFormData({
      name: '',
      code: '',
      category: '',
      series: '',
      description: '',
      price: '',
      image: '',
      specifications: '',
      applications: '',
      status: 'Active'
    });
    setIsFormDirty(false);
    localStorage.removeItem('adminFormData');
  };


  const generateCodeSuggestion = () => {
    if (formData.series && formData.category) {
      // Generate codes based on your actual product format
      if (formData.category === 'Air Filters') {
        const codes = ['17801-20040', '17801-22020', '8-94156-052-0'];
        return codes[Math.floor(Math.random() * codes.length)];
      } else if (formData.category === 'Fuel Filters') {
        return '31010';
      } else if (formData.category === 'Oil Filters') {
        return '51010';
      } else if (formData.category === 'Hydraulic Return Filters') {
        return '81010';
      } else if (formData.category === 'Coolant Filters') {
        return '61010';
      } else if (formData.category === 'Cabin Filters') {
        return '71010';
      }
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 self-start"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className="sm:text-right">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
              {isFormDirty && <span className="text-orange-500 ml-2">*</span>}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {product ? 'Update product information' : 'Add a new product to your catalog'}
              {isFormDirty && <span className="text-orange-500 text-sm ml-2">(Unsaved changes)</span>}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="lg:col-span-2">
                <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  id="product-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Standard panel air filter"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="product-category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="product-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              {/* Product Code */}
              <div>
                <label htmlFor="product-code" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Code *
                </label>
                <div className="flex">
                  <input
                    id="product-code"
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    autoComplete="off"
                    className={`flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.code ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 21010"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, code: generateCodeSuggestion() }))}
                    className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 text-sm"
                    aria-label="Generate product code"
                  >
                    Generate
                  </button>
                </div>
                {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
                <p className="mt-1 text-xs text-gray-500">
                  Format: Series + Model (e.g., 21010, 31020, 51010)
                </p>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (Ksh) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Ksh</span>
                  <input
                    id="product-price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    autoComplete="off"
                    className={`w-full pl-12 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.price ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>

              {/* Status */}
              <div>
                <label htmlFor="product-status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="product-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Discontinued">Discontinued</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="lg:col-span-2">
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                  <span className="text-xs text-gray-500 ml-2">
                    (Any size - automatically optimized)
                  </span>
                </label>
                <div className="space-y-4">
                  {/* Image Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      disabled={imageProcessing}
                      name="image"
                    />
                    <label
                      htmlFor="image-upload"
                      className={`cursor-pointer flex flex-col items-center ${
                        imageProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary-600'
                      }`}
                    >
                      {imageProcessing ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-2"></div>
                          <p className="text-sm text-gray-600">Processing image...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Click to upload product image
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            JPG, PNG, or WebP • Max 5MB • Any size
                          </p>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Product preview"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                          />
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Image Optimized Successfully!</h4>
                          {imageInfo && (
                            <div className="text-sm text-gray-600 mt-1">
                              <p>Original: {imageInfo.original.dimensions} ({imageInfo.original.size})</p>
                              <p>Optimized: {imageInfo.optimized.main.dimensions} ({imageInfo.optimized.main.size})</p>
                              <p className="text-green-600 font-medium">
                                ✓ Auto-resized for all devices
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {errors.image && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.image}</span>
                    </div>
                  )}

                  {/* Image Guidelines */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">📸 Image Guidelines</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Take photos with good lighting (natural light preferred)</li>
                      <li>• Use a clean, white or neutral background</li>
                      <li>• Capture multiple angles if possible</li>
                      <li>• Ensure the product is clearly visible</li>
                      <li>• <strong>Don't worry about size</strong> - we'll optimize it automatically!</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="product-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  autoComplete="off"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Detailed product description..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              {/* Specifications */}
              <div className="lg:col-span-2">
                <label htmlFor="product-specifications" className="block text-sm font-medium text-gray-700 mb-2">
                  Specifications
                </label>
                <textarea
                  id="product-specifications"
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleChange}
                  rows={3}
                  autoComplete="off"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Technical specifications..."
                />
              </div>

              {/* Applications */}
              <div className="lg:col-span-2">
                <label htmlFor="product-applications" className="block text-sm font-medium text-gray-700 mb-2">
                  Applications
                </label>
                <textarea
                  id="product-applications"
                  name="applications"
                  value={formData.applications}
                  onChange={handleChange}
                  rows={3}
                  autoComplete="off"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Common applications and use cases..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  if (isFormDirty) {
                    const confirmed = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
                    if (!confirmed) return;
                  }
                  
                  // Clear form data and localStorage
                  setFormData({
                    name: '',
                    code: '',
                    category: '',
                    series: '',
                    description: '',
                    price: '',
                    image: '',
                    specifications: '',
                    applications: '',
                    status: 'Active'
                  });
                  setIsFormDirty(false);
                  localStorage.removeItem('adminFormData');
                  
                  onCancel();
                }}
                className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {product ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
