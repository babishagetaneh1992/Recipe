'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilterOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/order/admin');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const filtered = orders.filter(
      (order) =>
        order._id.toLowerCase().includes(q) ||
        order.userEmail?.toLowerCase().includes(q)
    );
    setFilterOrders(filtered);
  }, [searchQuery, orders]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Admin Orders</h1>

      <input
        type="text"
        placeholder="Search by email or order ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-md w-full max-w-md mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3 border">Order ID</th>
              <th className="px-4 py-3 border">User Email</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4 text-gray-500">
                  No matching orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 border font-mono text-xs">{order._id}</td>
                  <td className="px-4 py-3 border">{order.userEmail}</td>
                  <td className="px-4 py-3 border">{order.paymentStatus}</td>
                  <td className="px-4 py-3 border">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 border">
                    <Link href={`/admin/order/${order._id}`}>
                      <button className="text-indigo-600 hover:underline font-medium">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
