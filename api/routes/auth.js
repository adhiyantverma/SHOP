const router = require("express").Router();
const User = require("../models/User");
// to use crypto-js add it first (this is to make your password encrypted).
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET
        ).toString(),
    });
    // to save this function to our DB below is the syntax.
    // using async and await function is because sometime for saving our data to our
    // database it took a little while to prevent that execution we use async and await
    // and also if there is any any problem to our server or in our DB so we can use
    // try and catch method below.

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)    // this is the other form of res.send() to make 
        // status(201) = successfully added
        // json=to show the saved user in json format.
    } catch (err) {
        res.status(500).json(err);
    }

});

//LOGIN

router.post("/login", async (req, res) => {
    try {
        
        const user = await User.findOne({ username: req.body.username });     
        // above (User) is model
        !user && res.status(401).json("wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        // (CryptoJS.enc.Utf8)(when we use other characters or unique we use this)
        originalPassword !== req.body.password &&
            res.status(401).json("wrong credentials");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SECRETKEY,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        // this above syntax is for hiding password from user and display other details.
        res.status(200).json({...others, accessToken});
    } catch (err) {
        res.status(500).json(err)

    }
});

module.exports = router;