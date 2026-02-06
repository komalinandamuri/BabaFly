import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoriesAPI } from '../services/apiEndpoints';
import { Loader, SkeletonProductGrid, EmptyState } from '../components/UIComponents';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import { addToCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CategoryProductsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategoryProducts();
  }, [id]);

  const fetchCategoryProducts = async () => {
    try {
      const response = await categoriesAPI.getCategoryProducts(id);
      setProducts(response.data);
      // Fetch category info
      const catRes = await categoriesAPI.getCategoryById(id);
      setCategory(catRes.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate('/categories')}
        className="flex items-center gap-2 mb-6 text-primary hover:underline"
      >
        <ArrowLeft size={20} />
        Back to Categories
      </button>

      {/* Category Title */}
      {category && (
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>
      )}

      {/* Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <div className="product-card bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={product.image || 'https://via.placeholder.com/300x300'}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
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
      ) : (
        <EmptyState
          icon={ShoppingBag}
          title="No Products in This Category"
          message="Try another category"
        />
      )}
    </div>
  );
};

export default CategoryProductsPage;
