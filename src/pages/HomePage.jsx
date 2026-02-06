import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setCategories } from '../redux/slices/productsSlice';
import { productsAPI, categoriesAPI } from '../services/apiEndpoints';
import { Loader, SkeletonProductGrid, EmptyState } from '../components/UIComponents';
import { Search, Sparkles, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import { addToCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, categories, isLoading } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getProducts({ limit: 8 }),
        categoriesAPI.getCategories(),
      ]);
      dispatch(setProducts(productsRes.data));
      dispatch(setCategories(categoriesRes.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await productsAPI.searchProducts(searchQuery);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-yellow-400 text-secondary py-16 rounded-lg mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-4">Premium Jewelry Collection</h1>
            <p className="text-xl mb-6 opacity-90">
              Discover exquisite designs with authentic metals and brilliant polish
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="btn-secondary">
                Shop Now
              </Link>
              <Link to="/categories" className="btn-outline">
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 text-6xl text-center">
            <Sparkles size={120} />
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="mb-12">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="form-input flex-grow"
          />
          <button type="submit" className="btn-primary" disabled={isSearching}>
            <Search size={20} />
          </button>
        </form>

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-8">
            {isSearching ? (
              <Loader />
            ) : searchResults.length > 0 ? (
              <div>
                <h3 className="text-2xl font-bold mb-4">Search Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {searchResults.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                icon={ShoppingBag}
                title="No Products Found"
                message="Try searching with different keywords"
              />
            )}
          </div>
        )}
      </section>

      {/* Featured Categories */}
      {!searchQuery && categories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category._id}`}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center cursor-pointer"
              >
                <div className="text-4xl mb-4">
                  {category.icon || '💎'}
                </div>
                <h3 className="text-lg font-semibold text-secondary">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {!searchQuery && (
        <section>
          <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
          {isLoading ? (
            <SkeletonProductGrid count={8} />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ShoppingBag}
              title="No Products Available"
              message="Check back soon for new products"
            />
          )}
        </section>
      )}
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="product-card bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48 bg-gray-200 overflow-hidden group">
          <img
            src={product.image || 'https://via.placeholder.com/300x300?text=Product'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-accent text-white px-3 py-1 rounded badge-primary">
              {product.discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-secondary truncate">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex gap-2 mb-3">
            <span className="badge badge-secondary text-xs">
              {product.metalType}
            </span>
            <span className="badge badge-secondary text-xs">
              {product.polishType}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            className="w-full btn-primary text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HomePage;
