const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      // attributes: { exclude: ['password'] },
      // order: [['name', 'ASC']],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render("home", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  //res.json({ key: 123 });
  // TODO: Note that 2 is hard coded for testing
  // TODO: Get your post id's from your user
      const postData = await Post.findByPk(2, {
      // attributes: { exclude: ['password'] },
      // order: [['name', 'ASC']],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
  res.render("dashboard", {
    name: "Yuri",
    // posts: [
    //   {
    //     id:1,
    //     name: "My personal post"
    //   }
    // ]
    posts: postData
  });
  // try {
  //   // Get all posts and JOIN with user data
  // TODO: 2 was hard coded. Maybe it should be  req.session.user_id?
  //   const postData = await Post.findByPk(2, {
  //     // attributes: { exclude: ['password'] },
  //     // order: [['name', 'ASC']],
  //     include: [
  //       {
  //         model: User,
  //         attributes: ["name"],
  //       },
  //     ],
  //   });

  //   const posts = postData.map(post => post.get({ plain: true }));

  //   res.render("home", {
  //     posts,
  //     logged_in: req.session.logged_in,
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

// router.get('/dashboard', withAuth, async(req,res) => {
// try {
//   const postData = await Post.findAll({
//     where: {
//       userId: req.session.userId,
//     },
//   })}

// Get one post -> post handlebar
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["Comment_text", "user_id"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/dashboard", withAuth, async (req, res) => {
  //url
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      // handlebars.
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
router.get("/signup", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
