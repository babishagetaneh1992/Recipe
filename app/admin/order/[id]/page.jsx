'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/order/${id}`);
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchOrder();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-600">Loading order details...</div>;
  if (error) return <div className="p-8 text-red-600 text-center">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2 text-indigo-700">Order Details</h1>

      <div className="space-y-3 text-gray-800">
        <div><span className="font-semibold">Order ID:</span> {order._id}</div>
        <div><span className="font-semibold">User Email:</span> {order.userEmail || 'N/A'}</div>
        <div><span className="font-semibold">Status:</span> {order.paymentStatus}</div>
        <div><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleString()}</div>
        <div><span className="font-semibold">Total Amount:</span> <span className="text-green-600 font-bold">${order.amount}</span></div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-600">Items</h2>
      <ul className="space-y-2">
        {order.items.map((item, index) => (
          <li
            key={index}
            className="p-3 border rounded-md bg-gray-50 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="font-semibold text-right">${item.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
