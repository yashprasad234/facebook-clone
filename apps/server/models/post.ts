import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    description: {
        type: String,
        default: "",
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
    },
    image: {
        type: String,
        default: ""
    },
}, {
    timestamps: true,
});

export const post = mongoose.models.post || mongoose.model("post", postSchema);