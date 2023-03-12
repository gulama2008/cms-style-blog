const router = require('express').Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

router.post('/login', async (req,res) => { 
    try {
        const userData = await User.findOne({
            where: {
                username:req.body.username,
            }
        })
        if (!userData) { 
            res.status(400).json({ message: "Incorrect username or password, please try again" });
            return
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) { 
            res.status(400).json({ message: "Incorrect username or password, please try again" });
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

router.post('/logout', async(req,res)=> {
    try {
        if (req.session.logged_in) { 
            req.session.destroy()
        }
    } catch (err) { 
        res.status(400).json(err);
    }
})


router.post("/register", async (req, res) => {
    try {
        const newUser = req.body;
        const hasUser = await User.findOne({
            where: { username: newUser.username },
        });
        if (hasUser) { 
            return res.json("username exist"); 
        }
        newUser.password = await bcrypt.hash(newUser.password, 10);
        const userData = User.create(newUser);
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