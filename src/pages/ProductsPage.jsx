import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setProducts,
  setFilters,
  setSortBy,
  filterProducts,
} from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { productsAPI } from '../services/apiEndpoints';
import { Loader, SkeletonProductGrid, EmptyState } from '../components/UIComponents';
import { formatPrice } from '../utils/helpers';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, filters, sortBy, isLoading } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [metalTypes, setMetalTypes] = useState([]);
  const [polishTypes, setPolishTypes] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, []);

  useEffect(() => {
    dispatch(filterProducts());
  }, [filters, sortBy, dispatch]);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getProducts();
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchFilters = async () => {
    try {
      const [metalRes, polishRes] = await Promise.all([
        productsAPI.getProductById('metals'),
        productsAPI.getProductById('polish'),
      ]);
      // Mock data since we don't have actual endpoints
      setMetalTypes(['Gold', 'Silver', 'Platinum', 'Diamond']);
      setPolishTypes(['High Polish', 'Matte', 'Brushed', 'Hammered']);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split('-').map(Number);
    dispatch(setFilters({ priceRange: [min, max] }));
  };

  const handleMetalChange = (metal) => {
    const metalList = filters.metalType.includes(metal)
      ? filters.metalType.filter((m) => m !== metal)
      : [...filters.metalType, metal];
    dispatch(setFilters({ metalType: metalList }));
  };

  const handlePolishChange = (polish) => {
    const polishList = filters.polishType.includes(polish)
      ? filters.polishType.filter((p) => p !== polish)
      : [...filters.polishType, polish];
    dispatch(setFilters({ polishType: polishList }));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <aside className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
          <h3 className="text-lg font-bold mb-4">Filters</h3>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Price Range</h4>
            <select onChange={handlePriceChange} className="form-input">
              <option value="0-1000000">All Prices</option>
              <option value="0-10000">₹0 - ₹10,000</option>
              <option value="10000-50000">₹10,000 - ₹50,000</option>
              <option value="50000-100000">₹50,000 - ₹1,00,000</option>
              <option value="100000-1000000">₹1,00,000+</option>
            </select>
          </div>

          {/* Metal Type */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Metal Type</h4>
            <div className="space-y-2">
              {metalTypes.map((metal) => (
                <label key={metal} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.metalType.includes(metal)}
                    onChange={() => handleMetalChange(metal)}
                    className="mr-2"
                  />
                  <span>{metal}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Polish Type */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Polish Type</h4>
            <div className="space-y-2">
              {polishTypes.map((polish) => (
                <label key={polish} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.polishType.includes(polish)}
                    onChange={() => handlePolishChange(polish)}
                    className="mr-2"
                  />
                  <span>{polish}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              dispatch(setFilters({ priceRange: [0, 1000000], metalType: [], polishType: [] }));
              setCurrentPage(1);
            }}
            className="w-full btn-secondary text-sm"
          >
            Clear Filters
          </button>
        </div>
      </aside>

      {/* Products Section */}
      <div className="md:col-span-3">
        {/* Sorting */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Products {filteredProducts.length > 0 && `(${filteredProducts.length})`}
          </h2>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="form-input w-48"
          >
            <option value="latest">Latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="ratings">Highest Ratings</option>
          </select>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <SkeletonProductGrid count={12} />
        ) : paginatedProducts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`}>
                  <div className="product-card bg-white rounded-lg shadow-md overflow-hidden h-full">
                    <div className="relative h-48 bg-gray-200">
                      <img
                        src={product.image || 'https://via.placeholder.com/300x300?text=Product'}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                      {product.discount && (
                        <span className="absolute top-2 right-2 badge badge-primary">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                      <p className="text-primary font-bold text-lg mt-2">
                        {formatPrice(product.price)}
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className="w-full btn-primary mt-4 text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? 'bg-primary text-secondary'
                        : 'bg-white border border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            icon={ShoppingBag}
            title="No Products Found"
            message="Try adjusting your filters"
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
