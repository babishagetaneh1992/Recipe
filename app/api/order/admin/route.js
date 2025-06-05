import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import order from "@/models/order";

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if(!session || session.user.email !== process.env.ADMIN_EMAIL) {
        return new Response(JSON.stringify({ error: 'Unauthorized'}), {status: 401});
    }

    await connectDB();
    const orders = await order.find().sort({createdAt: -1});

    return new Response(JSON.stringify(orders), {status: 200})
}