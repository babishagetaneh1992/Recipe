import connectDB from "@/lib/mongodb";
import order from "@/models/order";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { id } =  await context.params;
  console.log("Fetching order with ID:", id); // 👈 Log this


    

    try {
    await connectDB();
    const ord = await order.findById(id).lean();
    if (!ord) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(ord);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}