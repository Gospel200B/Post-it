const commentModel = require("../models/comment.model");

class CommentService {
  //create a new comment
  async createComment(data) {
    return await commentModel.create(data);
  }
  //get a comment by id
  async getComment(id) {
    return await commentModel.findById(id);
  }
  //update a comment by id
  async updateComment(id, data) {
    return await commentModel.findByIdAndUpdate(id, data);
  }
  //delete a comment by id
  async deleteComment(id) {
    return await commentModel.findByIdAndDelete(id);
  }
  //get all comments
  async getAllComments(filter) {
    return await commentModel.find(filter);
  }
}

module.exports = new CommentService();
