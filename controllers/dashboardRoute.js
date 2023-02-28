const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

// Create new post
router.post("/add", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      name: req.body.name,
      post_text: req.body.post_text,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET add topic form
router.get('/add', withAuth, (req, res) => {

  res.render('add-post', {
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;
