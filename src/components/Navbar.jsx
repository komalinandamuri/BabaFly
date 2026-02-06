import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { ShoppingCart, Menu, X, User, LogOut, Home } from 'lucide-react';

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-secondary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          ✨ BabaFly
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-primary transition">
            Products
          </Link>
          <Link to="/categories" className="hover:text-primary transition">
            Categories
          </Link>

          {token && (
            <Link to="/orders" className="hover:text-primary transition">
              Orders
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            {items.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {items.length}
              </span>
            )}
          </Link>

          {token ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-accent hover:bg-red-700 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-secondary px-4 py-2 rounded hover:opacity-90 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          md:hidden
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-secondary border-t border-gray-700">
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/products" onClick={() => setIsOpen(false)}>
              Products
            </Link>
            <Link to="/categories" onClick={() => setIsOpen(false)}>
              Categories
            </Link>
            {token && (
              <Link to="/orders" onClick={() => setIsOpen(false)}>
                Orders
              </Link>
            )}
            <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center">
              <ShoppingCart size={20} className="mr-2" />
              Cart ({items.length})
            </Link>
            {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-accent px-4 py-2 rounded text-left"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
