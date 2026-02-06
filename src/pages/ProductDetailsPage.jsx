import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { productsAPI } from '../services/apiEndpoints';
import { Loader } from '../components/UIComponents';
import { formatPrice } from '../utils/helpers';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
      navigate('/products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) return <Loader />;
  if (!product) return null;

  const images = product.images || [product.image];

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 mb-6 text-primary hover:underline"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="bg-gray-200 rounded-lg overflow-hidden mb-4 h-96">
            <img
              src={images[selectedImage] || 'https://via.placeholder.com/500x500'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'border-primary' : 'border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {product.rating && (
              <>
                <div className="flex gap-1">
                  {Array(Math.round(product.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <span className="text-gray-600">({product.reviews || 0} reviews)</span>
              </>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-4 text-xl text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discount && (
              <span className="ml-4 text-xl text-accent font-semibold">
                Save {product.discount}%
              </span>
            )}
          </div>

          {/* Specifications */}
          <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Metal Type</p>
                <p className="font-semibold">{product.metalType}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Polish Type</p>
                <p className="font-semibold">{product.polishType}</p>
              </div>
              {product.weight && (
                <div>
                  <p className="text-gray-600 text-sm">Weight</p>
                  <p className="font-semibold">{product.weight} gm</p>
                </div>
              )}
              {product.purity && (
                <div>
                  <p className="text-gray-600 text-sm">Purity</p>
                  <p className="font-semibold">{product.purity}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6 flex items-center gap-4">
            <label className="font-semibold">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-0 focus:outline-none"
              />
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart} className="w-full btn-primary py-3 text-lg mb-4">
            <ShoppingCart size={24} className="inline mr-2" />
            Add to Cart
          </button>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <p className="text-blue-800">
              ✓ Authentic Product | ✓ Free Shipping | ✓ 30-Day Return | ✓ Certified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
