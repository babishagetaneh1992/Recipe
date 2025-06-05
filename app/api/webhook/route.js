import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import Food from '@/models/food';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  let event;

  try {
    const rawBody = await req.arrayBuffer(); // ✅ Use Web API
    const bodyBuffer = Buffer.from(rawBody);
    const sig = req.headers.get('stripe-signature');

    event = stripe.webhooks.constructEvent(bodyBuffer, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // ✅ Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const cartItems = [];

      // Extract cartSummary and build items list
      const cartSummary = session.metadata.cartSummary || '';
      const entries = cartSummary.split(',');

      for (const entry of entries) {
        const [itemId, quantity] = entry.split(':');
        const product = await Food.findById(itemId);

        if (product) {
          cartItems.push({
            name: product.name,
            price: product.price,
            quantity: Number(quantity),
          });
        }
      }

      console.log('Cart items to save:', cartItems);


      const newOrder = new Order({
        stripeSessionId: session.id,
        paymentStatus: session.payment_status,
        amount: session.amount_total / 100,
        userEmail: session.customer_email,
        items: cartItems, // ✅ Use the built array instead of raw metadata
        cartSummary: session.metadata.cartSummary,
      });

      await newOrder.save();
      console.log('✅ Order saved:', newOrder._id);
    } catch (err) {
      console.error('❌ Failed to save order:', err);
      return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
