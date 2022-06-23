import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true
    },
    picture: String,
    seller: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "Seller"
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    info: mongoose.SchemaTypes.Mixed,
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    }

}, {
    timestamps: true
})

export default mongoose.model("Product",ProductSchema)