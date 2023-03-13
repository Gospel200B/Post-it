const userService = require('../services/user.service');

class UserController {
    
    async updateUser(req, res) {
        const userId = req.params.user;
        const updateData = req.body

        const existingUser = await userService.getUser({ 
            _id: userId 
        });

        if (!existingUser) {
            res.status(403).json({
                message: "User does not exist",
                success: false
            })
        }
        if (updateData.name) {
            const existingUserWithThisUpdateName = await userService.getUser({
                name: updateData.name.lowercase()
            })
            if (existingUserWithThisUpdateName._id.toString() === existingUser._id.toString()) {
                res.status(403).json({
                    success: false,
                    message: "User with this name already exist",
                    data: updateData
                })
            }
        }
        const updatedData = await userService.updateUser('userId', updatedData)
        res.status(200).json({
            success: true,
            message: "Account successfully updated",
            data: updatedData
        })
    }
    async deleteUser(req, res) {
        const userId = req.params.user;
        
        const existingUser = await userService.getUser({
            _id: userId
        })
        if (!existingUser){
            res.status(403).json({
                message: "User does not exist",
                success: false
            })
        }
        const deletedUser = await userService.deleteUser(userId)
        res.status(200).json({
            success: true,
            message: "Account successfully deleted",
            data: deletedUser
        })
        
    }

    async getUser(req, res) {
        const userId = req.params.user;

        const existingUser = await userService.getUser({
            _id: userId
        })
        if (!existingUser) {
            res.status(403).json({
                message: "User does not exist",
                success: false
            })
        }
        res.status(200).json({
            success: true,
            message: "User successfully fetched",
            data: existingUser
        })
    }

    async getAllUser(req, res){
         const users = await userService.getAllUser({})
        res.status(200).json({
            success: true, 
            message: "User successfully fetched", 
            data: users
        });
    }

}

const userController = new UserController();
module.exports = userController;