"use client";
import React from 'react';
import { useCart } from '@/context/cartContext';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

function CartPage() {
  const { cart, dispatch } = useCart();

  const handleRemove = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };
 
  const handleIncrease = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleDecrease = (product) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: product });
  };
  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

 
  
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const handleStripeCheckout = async () => {
  const stripe = await stripePromise;

  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart }),
  });

  const data = await response.json();

  if (data.id) {
    await stripe.redirectToCheckout({ sessionId: data.id });
    //window.location.href = data.url; // Fallback
    
  } else {
    toast.error("Checkout failed");
  }
};


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div key={item._id} className="border p-4 rounded shadow-md">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded" />
                <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>

                <div className='flex items-center mt-2'>
                    <button
                       onClick={() => handleDecrease(item)}
                       className='px-2 bg-grey-300 hover:bg-grey-400 rounded-1'
                    >
                      -
                    </button>
                    <span className='px-4'>{item.quantity}</span>

                    <button
                       onClick={() => handleIncrease(item)}
                       className='px-2 bg-grey-300 hover:bg-grey-400 rounded-r'
                    >+</button>
                </div>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className='mt-8 text-right'>
            <p className='text-xl font-semibold'>Total: ${totalAmount.toFixed(2)}</p>
          <button
            className="mt-6 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          
          <button
            className='mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700'
            onClick={handleStripeCheckout}
          >
            Checkout
          </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
