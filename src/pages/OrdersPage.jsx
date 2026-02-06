import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ordersAPI } from '../services/apiEndpoints';
import { setOrders } from '../redux/slices/ordersSlice';
import { Loader, EmptyState } from '../components/UIComponents';
import { formatPrice } from '../utils/helpers';
import { ShoppingBag, ChevronRight, Calendar, MapPin, Truck } from 'lucide-react';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getOrders();
      dispatch(setOrders(response.data));
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  if (localLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order._id} to={`/orders/${order._id}`}>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">Order #{order._id}</h3>
                    <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                      <Calendar size={16} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(order.totalAmount)}
                    </p>
                    <span className={`badge ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={20} className="text-primary" />
                      <div>
                        <p className="text-sm text-gray-600">Items</p>
                        <p className="font-semibold">{order.items?.length || 0} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={20} className="text-primary" />
                      <div>
                        <p className="text-sm text-gray-600">Delivery</p>
                        <p className="font-semibold">
                          {getDeliveryDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end">
                      <div className="flex items-center gap-2">
                        <MapPin size={20} className="text-primary" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-semibold">
                            {order.shippingAddress?.city}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ShoppingBag}
          title="No Orders Yet"
          message="Start shopping to place your first order"
        />
      )}
    </div>
  );
};

const getStatusBadge = (status) => {
  const statusStyles = {
    pending: 'badge-warning',
    processing: 'badge-secondary',
    shipped: 'badge-primary',
    delivered: 'badge-success',
    cancelled: 'badge-error',
  };
  return statusStyles[status] || 'badge-secondary';
};

const getDeliveryDate = (orderDate) => {
  const date = new Date(orderDate);
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString();
};

export default OrdersPage;
