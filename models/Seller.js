import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description : {
        required: true,
        type: String,
    },
    logo: String
}, {
    timestamps: true
})

export default mongoose.model("Seller",SellerSchema)