const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
    } catch (err) {
    res.status(400).json.err;
    }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
    include: [
        {
        model: User,
        attributes: ['username'],
        },
    ],
    });
console.log(postData);

    const post = postData.get({ plain: true });
    res.json(post)
    res.render('/', {
    ...post,
    logged_in: req.session.logged_in,
    });
    } catch (err) {
    res.status(400).json(err);
    }
});






router.post('/', withAuth, async (req, res) => {
    try {
    const newPost = await Post.create({
    ...req.body,
    userId: req.session.user_Id,
    });
    res.status(200).json(newPost);
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
});

router.put("/:id", withAuth, async (req, res) => {
try {
    const postData = await Post.update(req.body, {
    where: {
        id: req.params.id,
        user_id: req.session.user_id,
    },
    });
    if (!postData[0]) {
    res.status(404).json({ message: "No post found!!!" });
    return;
    }
    res.status(200).json({ message: "Post updated!" });
} catch (err) {
    res.status(500).json(err);
}
});

router.delete("/:id", withAuth, async (req, res) => {
try {
    const postData = await Post.destroy({
    where: {
        id: req.params.id,
        user_id: req.session.user_id,
    },
    });
    if (!postData) {
    res.status(304).json({ message: "No post found!!!" });
    return;
    }
    res.status(100).json({ message: "Post updated!" });
} catch (err) {
    res.status(475).json(err);
}
});

module.exports = router;