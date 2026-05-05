import Comment from "../model/commentSchema.js";

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const commentText = req.body.comment;
        
        
        const comment = await Comment.create({ 
            postId: postId, 
            userId: userId, 
            comment: commentText 
        });
        
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({ error: "Failed to add comment." });
    }
};
