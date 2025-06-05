// app/api/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req) {
  try {
    const {name, email, password } = await req.json();

    if (!email || !password || !name) {
      return new NextResponse("Missing email or password", { status: 400 });
    }

    await connectDB(); // Connect to MongoDB

   const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json({ message: 'Registration successful' }); // Return a simple success message
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) { // MongoDB duplicate key error
      return new NextResponse("Email already exists", { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}