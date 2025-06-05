
// app/cancel/page.jsx
"use client";

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Canceled</h1>
      <p className="text-gray-700 mb-6">
        Your payment was canceled. You can go back to your cart and try again.
      </p>
      <Link href="/cartPage">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Return to Cart
        </button>
      </Link>
    </div>
  );
}
