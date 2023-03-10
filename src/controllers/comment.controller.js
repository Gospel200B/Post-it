const commentService = require('../services/comment.service');

class CommentController {
    async createComment(req, res) {
        const reqbody = req.body;

        const comment = await commentService.createComment({reqbody})
        res.status(200).json({
            success: true,
            message: "Comment sent successfully",
            data: comment
        })
    }
    async updateComment(req, res) {
        const commentId = req.params._id;
        const updateData = req.body

        const existingComment = await commentService.getComment({ 
            _id: commentId 
        });

        if (!existingComment) {
            res.status(403).json({
                message: "Comment does not exist",
                success: false
            })
        }
        if (updateData.commentId) {
            const existingCommentWithThisUpdateName = await commentService.getComment({
                name: updateData.name.lowercase()
            })
            if (existingCommentWithThisUpdateName._id.toString() === existingComment._id.toString()) {
                res.status(403).json({
                    success: false,
                    message: "Comment with this name already exist",
                    data: updateData
                })
            }
        }
        const updatedData = await commentService.updateComment('commentId', updatedData)
        res.status(200).json({
            success: true,
            message: "Comment successfully updated",
            data: updatedData
        })
    }
    
    async getComment(req, res) {
        const commentId = req.params._id;

        const existingComment = await commentService.getComment({
            _id: postId
        })
        if (!existingComment) {
            res.status(403).json({
                message: "Comment does not exist",
                success: false
            })
        }
        res.status(200).json({
            success: true,
            message: "Comment successfully fetched",
            data: existingComment
        })
    }

    async getAllComments(req, res){
         const comments = await commentService.getAllComments({})
        res.status(200).json({
            success: true, 
            message: "Comments successfully fetched", 
            data: comments
        });
    }

}

const commentController = new CommentController();
module.exports = commentController;