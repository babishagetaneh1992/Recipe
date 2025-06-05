"use client";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/cartContext';

function HomePage() {
  const { data: session} = useSession()
  const [products, setProducts] = useState([]); // Initialize state to hold products
  const { dispatch } = useCart(); // Get dispatch from Cart context

  const fetchFood = async () => {
    try {
      const res = await fetch('api/admin');
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      setProducts(data); // Set the fetched products to state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const handleOrder = (product) => {
     dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Your Favorite Foods</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              { session?.user ? (
                  <Link href={'/cartPage'}>
                  <button className="mt-4 bg-slate-700 text-white py-2 px-4 rounded hover:bg-blue-600"
                         onClick={() => handleOrder(product)}  
                  >
                    Add to Cart
                  </button>
                  </Link>
              ) : (
                <Link href={'/login'}>
                  <button className="mt-4 bg-slate-700 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Add to cart
                  </button>
                  </Link>
              )}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;