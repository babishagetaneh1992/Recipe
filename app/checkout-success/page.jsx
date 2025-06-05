"use client"
import { useEffect } from 'react';
import { useCart } from '@/context/cartContext';

export default function CheckoutSuccessPage() {
  const { dispatch } = useCart();

  useEffect(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-4 text-gray-700">Thank you for your order!</p>
    </div>
  );
}
