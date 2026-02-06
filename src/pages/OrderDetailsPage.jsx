import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/apiEndpoints';
import { Loader } from '../components/UIComponents';
import { formatPrice } from '../utils/helpers';
import { ArrowLeft, Calendar, MapPin, Truck, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await ordersAPI.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
      navigate('/orders');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  if (!order) return null;

  const taxAmount = order.totalAmount * 0.18;
  const subtotal = order.totalAmount - taxAmount;

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center gap-2 mb-6 text-primary hover:underline"
      >
        <ArrowLeft size={20} />
        Back to Orders
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">Order #{order._id}</h1>
                <p className="text-gray-600 mt-2 flex items-center gap-2">
                  <Calendar size={18} />
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`badge text-lg px-4 py-2 ${getStatusStyle(order.status)}`}>
                {order.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items && order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                  <div>
                    <p className="font-semibold">{item.productId?.name || 'Product'}</p>
                    <p className="text-gray-600 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MapPin size={24} />
              Shipping Address
            </h2>
            <div className="text-gray-700">
              <p className="font-semibold">{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.addressLine1}</p>
              {order.shippingAddress?.addressLine2 && (
                <p>{order.shippingAddress.addressLine2}</p>
              )}
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
                {order.shippingAddress?.pincode}
              </p>
              <p className="mt-2 text-primary font-semibold">
                {order.shippingAddress?.phone}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Truck size={24} />
              Delivery Timeline
            </h2>
            <div className="space-y-4">
              {getTimeline(order.createdAt, order.status).map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-500 text-white' : 'bg-gray-300'
                      }`}
                    >
                      {step.completed && <CheckCircle size={20} />}
                    </div>
                    {idx < 3 && (
                      <div
                        className={`w-1 h-12 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold">{step.label}</p>
                    <p className="text-gray-600 text-sm">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
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
                <span className="text-primary">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <p className="font-semibold mb-2">Expected Delivery</p>
              <p>
                {new Date(
                  new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>
            </div>

            {order.status === 'pending' && (
              <button className="w-full btn-secondary mt-4">
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatusStyle = (status) => {
  const styles = {
    pending: 'badge-warning',
    processing: 'badge-secondary',
    shipped: 'badge-primary',
    delivered: 'badge-success',
    cancelled: 'badge-error',
  };
  return styles[status] || 'badge-secondary';
};

const getTimeline = (orderDate, status) => {
  const date = new Date(orderDate);
  const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
  const currentStatusIdx = statusOrder.indexOf(status);

  return [
    {
      label: 'Order Placed',
      date: date.toLocaleDateString(),
      completed: true,
    },
    {
      label: 'Processing',
      date: new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      completed: currentStatusIdx >= 1,
    },
    {
      label: 'Shipped',
      date: new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      completed: currentStatusIdx >= 2,
    },
    {
      label: 'Delivered',
      date: new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      completed: currentStatusIdx >= 3,
    },
  ];
};

export default OrderDetailsPage;
