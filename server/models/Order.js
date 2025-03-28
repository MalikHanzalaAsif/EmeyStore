import mongoose from "mongoose";
const { Schema } = mongoose;


const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    price: {
        type: String,
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;