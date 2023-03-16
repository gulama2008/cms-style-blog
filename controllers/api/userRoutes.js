const router = require('express').Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const withAuth = require('../../utils/auth');


router.get('/', async (req,res) => { 
    const userData = await User.findAll();
    res.status(200).json(userData);
})

router.post('/login', async (req, res) => { 
    console.log(11111);
    try {
        const userData = await User.findOne({
            where: {
                username:req.body.username,
            }
        })
        console.log(222222);
        console.log(userData);
        if (!userData) { 
            res.status(400).json({ message: "Incorrect username or password, please try again" });
            return
        }
        const validPassword = await userData.checkPassword(req.body.password);
        console.log(validPassword,123);
        console.log(req.body.password,456);
        if (!validPassword) { 
            res.status(404).json({ message: "Incorrect username or password, please try again" });
            return;
        }
        req.session.save(() => { 
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
            res.status(200).json(userData);
        })
    } catch (err) { 
        res.status(400).json(err)
    }
})

router.post('/logout', withAuth, async(req,res)=> {
    if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/register", async (req, res) => {
    console.log('signup',333333);
    try {
        const newUser = req.body;
        const hasUser = await User.findOne({
            where: { username: newUser.username },
        });
        if (hasUser) { 
            return res.json("username exist"); 
        }
        newUser.password = await bcrypt.hash(newUser.password, 10);
        const userData = await User.create(newUser);
        console.log(userData,4444444);
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.logged_in = true;
          res.status(200).json(userData);
        });
    } catch (err) { 
        res.status(400).json(err);
    }
});

module.exports = router;