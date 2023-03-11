const router = require('express').Router();
const {
    createComment, 
    updateComment, 
    getComment, 
    getAllComments
} = require('../controllers/comment.controller');

router.post('/', createComment);
router.patch('/:id', updateComment);
router.get('/:id', getComment);
router.get('/', getAllComments);

module.exports = router;