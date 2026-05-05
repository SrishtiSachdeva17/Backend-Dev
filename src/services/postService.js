import Post from "../model/postSchema.js";

export const createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const userId = req.user.id;
        
        const post = await Post.create({ 
            title: title, 
            content: content, 
            tags: tags,
            userId: userId 
        });
        
        return res.status(201).json(post);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Post title must be unique." });
        }
        return res.status(500).json({ error: "Failed to create post." });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            }
        ]);
        
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch posts." });
    }
};

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const updateData = req.body;

        const post = await Post.findOneAndUpdate(
            { _id: postId, userId: userId },
            updateData,
            { new: true }
        );
        
        if (!post) {
            return res.status(404).json({ error: "Post not found or you are not authorized to update it." });
        }
        
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: "Failed to update post." });
    }
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const userRole = req.user.role;
        
        let query;
        if (userRole === "Admin") {
            query = { _id: postId };
        } else {
            query = { _id: postId, userId: userId };
        }
        
        const post = await Post.findOneAndDelete(query);
        
        if (!post) {
            return res.status(404).json({ error: "Post not found or you are not authorized to delete it." });
        }
        
        return res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete post." });
    }
};

export const getTrendingPosts = async (req, res) => {
    try {
        const trendingPosts = await Post.aggregate([
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $addFields: { 
                    commentCount: { $size: "$comments" } 
                }
            },
            {
                $sort: { commentCount: -1 }
            },
            {
                $limit: 10 
            }
        ]);
        
        return res.status(200).json(trendingPosts);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch trending posts." });
    }
};
