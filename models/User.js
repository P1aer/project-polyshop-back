import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    //cart: {
    //required: true,
   // type: mongoose.Types.ObjectId,
  //  ref: "Cart",
    // }
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

export default mongoose.model("User",UserSchema)