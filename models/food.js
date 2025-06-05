import mongoose from "mongoose";


const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   
    price: { 
        type: Number,
        required: true
     },
     image: {
        type: String,
        required: [true, 'image is required']
     },
});

const Food = mongoose.models.Food || mongoose.model('Food', foodSchema);

export default Food;

