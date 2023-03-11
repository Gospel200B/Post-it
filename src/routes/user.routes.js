const router = require('express').Router();
const {
    updateUser, 
    deleteUser, 
    getUser, 
    getAllUser
} = require('../controllers/user.controller');

router.patch('/:id', updateUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUser);

module.exports = router;