const router = require('express').Router();

const {
    createPost, 
    updatePost, 
    deletePost, 
    getPost, 
    getAllPost 
} = require('../controllers/post.controller');

router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/:id', getPost);
router.get('/', getAllPost);

module.exports =  router