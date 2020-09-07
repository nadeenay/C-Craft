const router=require('express').Router();
const User=require('../models/User');
const {ensureauthenticated}=require('../config/auth');
router.get('/',ensureauthenticated, async (req, res) => {
    try {
        const user=await User.findById(req.user._id);
        res.render('User-Profile', {
            title: user.Name,
            css: "User-Profile",
            user: user
        });
    } catch (err) {console.log(err)}
});
module.exports = router;