
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // in .env.local

export async function POST(req) {

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

   if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }
  
  
  const userEmail = session.user.email; // ✅ Now you have the email
  try {
    const { cart } = await req.json();

    const line_items = cart.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: ['https://via.placeholder.com/150'], // safe placeholder
        },
        unit_amount: Math.round(item.price * 100), // in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: userEmail, 
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
       metadata: {
       cartSummary: cart.map(item => `${item._id}:${item.quantity}`).join(','), // ✅ light reference like "123abc:2,456def:1"       // <-- cart is an array of items
       userId: userId,  // <-- get this from session
      
  }
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return new NextResponse(JSON.stringify({ error: 'Stripe checkout failed' }), {
      status: 500,
    });
  }
}
