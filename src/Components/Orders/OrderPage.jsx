import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './OrderPage.css'; // Import your CSS file for styling

export default function OrderPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (currentUser) {
          const ordersQuery = query(
            collection(db, 'orders'),
            where('userId', '==', currentUser.uid)
          );
          const querySnapshot = await getDocs(ordersQuery);

          const ordersData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            orderId: doc.id,
          }));

          setOrders(ordersData);
        }
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div className="order-page-container">
      <h2 className="order-page-title">Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders-message">No orders yet.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.orderId} className="order-item">
              <p className="order-image"><img src={order.image} alt="" /></p>
              <p className="order-detail">{order.name}</p>
              <p className="order-detail"> ${order.price}</p>
              <p className="order-detail">Qty - {order.quantity}</p>
              <p className="order-detail">Ordered On - {order.timestamp.toDate().toLocaleString()}</p>
              {/* Add more details if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
