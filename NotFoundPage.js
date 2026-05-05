import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
          <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center w-full sm:w-auto"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.history.back()}
              className="btn-outline inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
            
            <Link
              to="/products"
              className="btn-secondary inline-flex items-center justify-center"
            >
              <Search className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Need Help?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            If you're looking for something specific, try these popular pages:
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/products" className="text-primary-600 hover:text-primary-700">
              Products
            </Link>
            <Link to="/services" className="text-primary-600 hover:text-primary-700">
              Services
            </Link>
            <Link to="/about" className="text-primary-600 hover:text-primary-700">
              About Us
            </Link>
            <Link to="/contact" className="text-primary-600 hover:text-primary-700">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
