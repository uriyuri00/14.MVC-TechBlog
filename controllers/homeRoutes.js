const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all post for home
router.get('/', async (req, res) => {
  try {
        // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      // attributes: { exclude: ['password'] },
      // order: [['name', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id'],
        },
      ],
    });

    const  posts= postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth,  async (req, res) => {
  try {
    const postData = await Post.findAll(
    {
        where: { user_id: req.session.user_id,        },
        include: [{
          model: Comment,
          attributes: ['id']  },
                 {
          model: User,
          attributes: ['name']  }],
      }
      )

  const  posts= postData.map((post) => post.get({ plain: true }));
  res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




// Get one post -> post handlebar
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name","user_id"],
        },
        {
          model: Post,
          attributes: ["name"],
        },
        // {
        //   model: Comment,
        //   attributes: ["Comment_text", "user_id"],
        // },
      ],
    });
    const posts = postData.get({plain: ture});


    res.render("posts", { posts, logged_in:req.session.logged_in    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get("/dashboard", withAuth, async (req, res) => {
//   //url
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("dashboard", {
//       // handlebars.
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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