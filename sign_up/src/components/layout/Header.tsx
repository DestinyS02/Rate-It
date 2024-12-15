import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-red-500">Rateit</div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">Write a Review</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Businesses</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;