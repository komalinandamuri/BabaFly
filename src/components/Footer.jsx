import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">✨ BabaFly</h3>
            <p className="text-gray-400">
              Premium jewelry marketplace with authenticated products and secure transactions.
            </p>
            <div className="flex space-x-4 mt-4">
              <Facebook size={20} className="hover:text-primary cursor-pointer" />
              <Twitter size={20} className="hover:text-primary cursor-pointer" />
              <Instagram size={20} className="hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/products" className="hover:text-primary">Products</Link></li>
              <li><Link to="/categories" className="hover:text-primary">Categories</Link></li>
              <li><Link to="/cart" className="hover:text-primary">Cart</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <span>info@babafly.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <span>+91-1234-567890</span>
              </div>
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 text-primary mt-1" />
                <span>123 Jewelry Street,<br />New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 BabaFly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
