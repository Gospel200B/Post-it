const userModel = require('../models/user.model');

class UserService {
    //createUser
    async createUser (userName, password, email){
        return await userModel.create({
            userName: userName,
            password: password,
            email: email
        });
    }
    //updateUser
    async updateUser (email, username, password) {
        const user = {userName: username, password: password, email : email}
        return await userModel.findByIdAndUpdate(user._id, user, {new : true});
    }
    // getUser
    async getUser (id) {
        return await userModel.findById(id);
    }
    //getAllUser
    async getAllUser(filter) {
        return await userModel.find(filter);
    }
    //deleteUser
    async deleteUser (id) {
        return await userModel.findByIdAndDelete(id, {active: true}, {new: true});
    }
}

const userService = new UserService();
module.exports = userService;