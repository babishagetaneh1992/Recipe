import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
  {
    name: {
         type: String,
         required: true, 
         unique: true 
         },
    email: {
         type: String, 
         required: true, 
         unique: true
         },
    password: { 
        type: String, 
        required: true 
         },
    
    role: {
         type: String,
         enum: ["customer","admin"],
         default:"customer"
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);




const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;