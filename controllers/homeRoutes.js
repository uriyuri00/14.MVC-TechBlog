const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');



// // Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('home', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      // attributes: { exclude: ['password'] },
      // order: [['name', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard/:id', withAuth, async(req,res) => {
  try{
    const postData = await Post.findByPk(req.params.id,{
        include: [
          {
             model : Post,
                   attributes: ['name'] }],
        });
      
      const post = postData.get({plain : true });

      res.render('dashboard', {
        ...post,
        logged_in: req.session.logged_in
      });
    }
      catch (err) {
        res.status(500).json(err);
      }
    });

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});
router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});



module.exports = router;
