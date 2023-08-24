import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, markOrderDelivered, createOrder } from '../store/actions/orderActions';

const OrderListPage = () => {
  const dispatch = useDispatch();
  const { orders ,error } = useSelector((store) => store.orderReducer);
  const { items } = useSelector((store) => store.itemReducer);
  const { customers } = useSelector((store) => store.customerReducer);
  const { deliveryVehicles } = useSelector((store) => store.deliveryVehicleReducer);
  const {token} =useSelector((store)=>store.authReducer)
  //console.log(error)
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedDeliveryVehicle, setSelectedDeliveryVehicle] = useState('');

  useEffect(() => {
    dispatch(fetchOrders(token));
  }, []);

  const handleMarkDelivered = (orderId) => {
    dispatch(markOrderDelivered(orderId,token));
  };

  const handleCreateOrder = () => {
    // Find the selected item, customer, and delivery vehicle based on their IDs
    const item = items.find((item) => item._id === selectedItem);
    const customer = customers.find((customer) => customer._id === selectedCustomer);
    const deliveryVehicle = deliveryVehicles.find((vehicle) => vehicle._id === selectedDeliveryVehicle);

    if (item && customer && deliveryVehicle) {
      const orderData = {
        itemId: item._id,
        customerId: customer._id,
        deliveryVehicleId: deliveryVehicle._id,
      };
      dispatch(createOrder(orderData,token));
    }
  };

  return (
    <div>
      <h1>Order List Page</h1>

      <div>
        <h2>Create Order</h2>
        <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>
        <select
          value={selectedDeliveryVehicle}
          onChange={(e) => setSelectedDeliveryVehicle(e.target.value)}
        >
          <option value="">Select Delivery Vehicle</option>
          {deliveryVehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
              {vehicle.registrationNumber}
            </option>
          ))}
        </select>
        <button onClick={handleCreateOrder}>Create Order</button>
      </div>

      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order ID: {order._id}, Delivered: {order.isDelivered ? 'Yes' : 'No'}
            {!order.isDelivered && (
              <button onClick={() => handleMarkDelivered(order._id)}>Mark Delivered</button>
            )}
          </li>
        ))}
      </ul>
      <div>
  {error != null && <>{error} </>}
</div>
    </div>
  );
};

export default OrderListPage;
