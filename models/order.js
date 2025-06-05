import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    stripeSessionId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['paid', 'unpaid', 'failed'],
    },
    amount: {
      type: Number,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userId: {
      type: String, // Optional, if you attach userId to metadata
    },
    cartSummary: {
      type: String, // Optional, store a summary like product names
    },
   items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
