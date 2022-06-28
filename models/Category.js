import mongoose from "mongoose";

const CatSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description : {
        required: true,
        type: String,
    }

}, {
    timestamps: true
})

export default mongoose.model("Category",CatSchema)