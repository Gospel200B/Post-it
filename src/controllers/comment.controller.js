const commentService = require('../services/comment.service');
const commentModel = require('../models/comment.model');

const handleErrors = (err) => {
    console.log(err._message, err.code);
    let errors = {title: '', body: ''};

//     //validation errors
    if(err._message.includes('Post validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties._message;
        })
    }

    return errors;
}
class CommentController {
    async createComment(req, res) {
        const {comment} = req.body;
        
        const { title, body} = req.body;

    try {
      const post = await commentService.createComment({ comment});
      return res.status(200).json({
        success: true,
        message: "Comment successfully created",
        data: comment
      });
    } catch (err) {
        // const errors = handleErrors();
     console.log(err);
    }
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
            _id: commentId
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