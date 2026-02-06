import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../redux/slices/cartSlice';
import { formatPrice } from '../utils/helpers';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { EmptyState } from '../components/UIComponents';
import toast from 'react-hot-toast';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItem({ id, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  if (items.length === 0) {
    return (
      <div>
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          message="Start shopping to add items to your cart"
        />
        <div className="text-center mt-8">
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-6 border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* Image */}
                <Link
                  to={`/products/${item._id}`}
                  className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded overflow-hidden"
                >
                  <img
                    src={item.image || 'https://via.placeholder.com/100x100'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-grow">
                  <Link
                    to={`/products/${item._id}`}
                    className="text-lg font-semibold hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600 text-sm mb-2">{item.metalType}</p>
                  <p className="text-primary font-bold text-lg">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 h-fit">
                  <button
                    onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                    className="text-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item._id, parseInt(e.target.value) || 1)
                    }
                    className="w-12 text-center border-0 focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                    className="text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right flex flex-col justify-center">
                  <p className="text-xl font-bold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {item.quantity} x {formatPrice(item.price)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:text-red-800 transition self-center"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{formatPrice(totalPrice * 0.18)}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  {formatPrice(totalPrice + totalPrice * 0.18)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary py-3 mb-3"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/products')}
              className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
