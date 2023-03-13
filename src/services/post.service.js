const postModel = require("../models/post.model");

class PostService {
  //create a new post
  async createPost(data) {
    return await postModel.create(data);
  }
  //get a post from the database
  async getPost(id) {
    return await postModel.findById(id);
  }
  //update a post in the database
  async updatePost(id, data) {
    return await postModel.findByIdAndUpdate(id, data);
  }
  //delete a post from the database
  async deletePost(id) {
    return await postModel.findByIdAndDelete(id);
  }
  //get all posts from the database
  async getAllPost(filter) {
    return await postModel.find(filter);
  }
}
const postService = new PostService();
module.exports = postService;
