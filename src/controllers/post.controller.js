const postService = require('../services/post.service');

class PostController {
    async createPost(req, res) {
        const reqbody = req.body;

        const post = await postService.createPost({reqbody})
        res.status(200).json({
            success: true,
            message: "Post successfully created",
            data: post
        })
    }
    async updatePost(req, res) {
        const postId = req.params._id;
        const updateData = req.body

        const existingPost = await postService.getPost({ 
            _id: postId 
        });

        if (!existingPost) {
            res.status(403).json({
                message: "Post does not exist",
                success: false
            })
        }
        if (updateData.postId) {
            const existingPostWithThisUpdateName = await postService.getPost({
                name: updateData.name.lowercase()
            })
            if (existingPostWithThisUpdateName._id.toString() === existingPost._id.toString()) {
                res.status(403).json({
                    success: false,
                    message: "Post with this name already exist",
                    data: updateData
                })
            }
        }
        const updatedData = await postService.updatePost('postId', updatedData)
        res.status(200).json({
            success: true,
            message: "Post successfully updated",
            data: updatedData
        })
    }
    async deletePost(req, res) {
        const postId = req.params._id;
        
        const existingPost = await postService.getPost({
            _id: postId
        })
        if (!existingPost){
            res.status(403).json({
                message: "Post does not exist",
                success: false
            })
        }
        const deletedPost = await postService.deletePost(postId)
        res.status(200).json({
            success: true,
            message: "Post successfully deleted",
            data: deletedPost
        })
        
    }

    async getPost(req, res) {
        const postId = req.params._id;

        const existingPost = await postService.getPost({
            _id: postId
        })
        if (!existingPost) {
            res.status(403).json({
                message: "Post does not exist",
                success: false
            })
        }
        res.status(200).json({
            success: true,
            message: "Post successfully fetched",
            data: existingPost
        })
    }

    async getAllPost(req, res){
         const posts = await postService.getAllPost({})
        res.status(200).json({
            success: true, 
            message: "Posts successfully fetched", 
            data: posts
        });
    }

}

const postController = new PostController();
module.exports = postController;