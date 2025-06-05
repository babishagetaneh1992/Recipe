
'use client';
import { useEffect, useState } from 'react';

export default function orderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('/api/order/user')
        .then(res => res.json())
        .then(data => setOrders(data));
    },[]);

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>My Order History</h2>
            {orders.map(order=> (
                <div key={order._id} className='border p-4 mb-4 rounded-md shadow'>
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Status:</strong> {order.paymentStatus}</p>
                  <p><strong>Amount:</strong> ${order.amount}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  <ul className='ml-4 mt-2'>
                    {order.items.map((item, i) =>(
                          <li key={i}>🍽 {item.name} x {item.quantity}</li>
                    ))}
                  </ul>
                </div>
            ))}
        </div>
    )
}