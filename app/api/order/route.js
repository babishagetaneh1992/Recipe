import connectDB from "@/lib/mongodb";
import Order from "@/models/order";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST (req) {
    await connectDB();
    const session = await getServerSession(authOptions);
    console.log("Session in order API:", session); // 👀
    const body = await req.json();

    if(!session || !session.user || !session.user.id) {
         return new Response(JSON.stringify({ message: 'Not authenticated' }), { status: 401 });
    }


   const { cart, totalAmount} = body;

   try {
 const newOrder = await Order.create({
    user: session.user.id,
    items: cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
    })),
    totalAmount,
 })
    return new Response(JSON.stringify(newOrder), { status: 201 });
   } catch (error) {
      console.error("Order API Error:", error); // 👈 this will show the real issue
     return new Response(JSON.stringify({ message: 'Order failed', error: error.message }), {
      status: 500,
    });
   }
}