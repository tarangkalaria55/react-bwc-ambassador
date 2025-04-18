
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bwc-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img 
              src="https://brazilianwaxingcompany.com/wp-content/uploads/2025/01/brazilianwaxingcompany.png" 
              alt="Brazilian Waxing Company" 
              className="h-12 w-auto object-contain max-w-[200px]"
            />
            <p className="text-gray-300 text-sm">
              Premium salon services and exclusive beauty products for our valued clients.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-bwc-gold uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-bwc-gold uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-bwc-gold uppercase tracking-wider mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Brazilian Waxing Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
