const router = require('express').Router();
const { Comment, Post , User } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/post/:id/comments', async (req, res) => {
  try {
      const commentData = await Comment.findAll({
          where: { id: req.params.id },
          include: [{
              model: Post,
              attributes: ['title', 'contents']
          },
          {
              model: User,
              attributes: ['username']
          }]
      });
      res.status(200).json(commentData);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post('/post/:postId/comments', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      post_id: req.params.postId,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;