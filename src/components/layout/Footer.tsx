import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-orange-500">FoodDash</h3>
            <p className="text-gray-600">
              Your favorite food, delivered fast to your door.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/restaurants" className="hover:text-orange-500">All Restaurants</Link></li>
              <li><Link to="/offers" className="hover:text-orange-500">Offers</Link></li>
              <li><Link to="/help" className="hover:text-orange-500">Help & Support</Link></li>
              <li><Link to="/about" className="hover:text-orange-500">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Legal</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/terms" className="hover:text-orange-500">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-500">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Follow Us</h4>
            <div className="flex space-x-3">
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-orange-500"><Twitter className="h-5 w-5" /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-orange-500"><Linkedin className="h-5 w-5" /></a>
              <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-orange-500"><Github className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
          &copy; {currentYear} FoodDash Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;