import connectDB from "@/lib/mongodb";
import Food from "@/models/food";


export async function PUT(req, {params}) {
    await connectDB()
    const { id } = params;

    try {
        const body = await req.json()
        const updatedProduct = await Food.findByIdAndUpdate(id,body, {
            new: true
        });

        if(!updatedProduct) {
            return new Response(JSON.stringify({ error: "Product not Found"}), {
                status: 404,
                headers: { 'Content-Type': 'application/json'},
            });
        }

        return new Response(JSON.stringify(updatedProduct), {
            status: 200,
            headers: { 'Content-Type': 'application/json'},
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update Product"}), {
            status: 500,
            headers: { 'Content-Type': 'application/json'},
        });
    }
}


export async function DELETE(req, { params }) {
    await connectDB();
    const { id } = params;

    try {
        const deletedProduct = await Food.findByIdAndDelete(id);

        if (!deletedProduct) {
            return new Response(JSON.stringify({ error: "Product not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: "Product deleted successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete product" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}