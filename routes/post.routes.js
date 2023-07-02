const Router = require('express');
const router = new Router();

const postController = require('../controller/post.controller');

router.post('/posts', postController.createPost);
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getOnePost);
router.put('/posts', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
