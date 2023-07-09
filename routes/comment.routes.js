const Router = require('express');
const router = new Router();

const commentController = require('../controller/comment.controller');

router.post('/comments', commentController.createComment);
router.get('/comments', commentController.getComments);
router.get('/comments/:id', commentController.getOneComment);
router.put('/comments', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
