// app/api/register/route.js
import { NextResponse } from 'next/server';

import connectDB from '@/lib/mongodb';
import Food from '@/models/food';


export async function POST(req) {
  try {
    const {name, price, image } = await req.json();

    if (!name || !price || !image) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    await connectDB(); // Connect to MongoDB

   

    const food = await Food.create({
      name,
      price,
      image,
    });

    await food.save();

    return NextResponse.json({ message: 'Registration successful' }); // Return a simple success message
  } catch (error) {
    console.error("Food Creation error:", error);
    if (error.code === 11000) { // MongoDB duplicate key error
      return new NextResponse("Food already exists", { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}





export  async function GET(req, res) {
    await connectDB();

    try {
        const products = await Food.find({});
       return new Response(JSON.stringify(products),{
        status: 200,
        headers: { 'Content-Type': 'application/json'},
       })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
          status: 500,
          headers:  { 'Content-Type': 'application/json' },
        });
    }
}