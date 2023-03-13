const router = require('express').Router();
const { Post, User,Comment } = require("../../models");
const withAuth = require("../../utils/auth");


router.get('/', withAuth, async (req, res) => {
    console.log(11111);
    try {
        const postData = await Post.findAll({
            where: user_id = req.session.user_id,
        });
        console.log(postData,222222);
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts,3333333);
            // Pass serialized data and session flag into template
            res.render("dashboard", {
              posts,
              logged_in: req.session.logged_in,
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/details/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
            attributes: ["content", "date_created"],
            include: [
                {
                    model: User,
                    attributes:['username'],
                }
            ]
        },
      ],
    });
    const post = postData.get({ plain: true });

    res.render("postDetails", {
      post,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
      
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/myposts/:id', withAuth, async (req, res) => { 
    console.log(999999);
    try {
        const postData = await Post.findByPk(req.params.id);
        console.log(postData,12345);
        const post = postData.get({ plain: true });
        console.log(post,67890);
        res.render('editPost', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) { 
        res.status(500).json(err);
    }
})

router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("addComment", {
      post,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
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
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  console.log(req.session.user_id);
  console.log(req.body);
  try {
    const postData = await Post.update(req.body, {
      where: {
            id: req.params.id,
            user_id: req.session.user_id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    console.log(postData);
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;