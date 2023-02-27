const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

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


// router.get('/dashboard', withAuth, async(req,res) => {
  // try {
  //   const postData = await Post.findAll({
  //     where: {
  //       userId: req.session.userId,
  //     },
  //   })}
  router.get('/dashboard/:id', async (req, res) => {

  try{
    const postData = await Post.findByPk(req.params.id,{
        include: [
          {
            model : User,
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
    router.get('/post', withAuth, async (req, res) => {
      try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Project }],
        });
    
        const user = userData.get({ plain: true });
    
        res.render('post', {
          ...user,
          logged_in: true
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});



module.exports = router;
