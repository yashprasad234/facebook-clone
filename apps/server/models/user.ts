import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,
        min: 3,
        max: 30,
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 30,
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 20,
    },
    friends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    from: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
})

export const user = mongoose.models.user || mongoose.model("user", userSchema);