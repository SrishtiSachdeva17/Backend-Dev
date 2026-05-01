import mongoose from 'mongoose'
mongoose.set("bufferCommands", false);
const dbConnection = mongoose.connect("mongodb://127.0.0.1:27017/softDeleteDB", {
    serverSelectionTimeoutMS: 3000
});
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    deleted: {
        type: Boolean,
        default: false
    }
});
postSchema.pre(/^find/, function(next) {
    this.where({ deleted: false });
    next();
});

const Post = mongoose.model("Post", postSchema);
const softDelete = async (id) => {
    await Post.findByIdAndUpdate(id, {
        deleted: true
    });

    console.log("Post soft deleted");
};
const getPosts = async () => {
    await dbConnection;
    const posts = await Post.find();
    console.log(posts);
};

dbConnection
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    })
    .finally(async () => {
        await mongoose.connection.close();
    });
