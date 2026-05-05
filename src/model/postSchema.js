import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
