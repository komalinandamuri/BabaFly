import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ordersAPI } from '../services/apiEndpoints';
import { clearCart } from '../redux/slices/cartSlice';
import { addOrder } from '../redux/slices/ordersSlice';
import { addressSchema } from '../utils/validationSchemas';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
    },
  });

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate('/cart')}
          className="btn-primary flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>
      </div>
    );
  }

  const taxAmount = totalPrice * 0.18;
  const finalTotal = totalPrice + taxAmount;

  const onSubmit = async (data) => {
    setIsProcessing(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
        totalAmount: finalTotal,
        status: 'pending',
      };

      const response = await ordersAPI.createOrder(orderData);
      
      dispatch(clearCart());
      dispatch(addOrder(response.data));
      
      toast.success('Order placed successfully!');
      navigate(`/orders/${response.data._id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Address Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    {...register('fullName')}
                    className="form-input"
                    placeholder="Enter full name"
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName.message}</span>}
                </div>

                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="form-input"
                    placeholder="Enter email"
                  />
                  {errors.email && <span className="form-error">{errors.email.message}</span>}
                </div>
              </div>

              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="form-input"
                  placeholder="10-digit phone number"
                />
                {errors.phone && <span className="form-error">{errors.phone.message}</span>}
              </div>

              <div>
                <label className="form-label">Address Line 1</label>
                <input
                  type="text"
                  {...register('addressLine1')}
                  className="form-input"
                  placeholder="Street address"
                />
                {errors.addressLine1 && (
                  <span className="form-error">{errors.addressLine1.message}</span>
                )}
              </div>

              <div>
                <label className="form-label">Address Line 2</label>
                <input
                  type="text"
                  {...register('addressLine2')}
                  className="form-input"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    {...register('city')}
                    className="form-input"
                    placeholder="City"
                  />
                  {errors.city && <span className="form-error">{errors.city.message}</span>}
                </div>

                <div>
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    {...register('state')}
                    className="form-input"
                    placeholder="State"
                  />
                  {errors.state && <span className="form-error">{errors.state.message}</span>}
                </div>

                <div>
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    {...register('pincode')}
                    className="form-input"
                    placeholder="6-digit pincode"
                  />
                  {errors.pincode && <span className="form-error">{errors.pincode.message}</span>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn-primary py-3 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm pb-2 border-b">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
              ✓ Secure checkout | ✓ Cash on Delivery | ✓ Easy Returns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
