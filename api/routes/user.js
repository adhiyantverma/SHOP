const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET
        ).toString();
    }

    try { // this two paramtrs (user.id, what i am going to update)
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true } // if you just set the body it not update (to prevent we use this true)
        );
        res.status(200).json(updatedUser);
    } catch (err) { res.status(500).json(err) };
});

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted....!")
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER
// only admin can get the user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        // this above syntax is for hiding password from user and display other details.
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USER
// only admin can get the user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    // here (new) is the name of query means what you write after params or route.
    try {
        const users = query ? await User.find().sort({_id:-1}).limit(2) : await User.find();
        // this above line means:  if there is a query asked by user than it will response
        // and give 2 users with help of limit and if there is not a query than all user.
        // sort func helps in giving recent users.
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER STATISTICS

router.get("/stats", verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

    try{

        const data = await User.aggregate([
        //aggregate means //Group values from multiple documents together.
        //Perform operations on the grouped data to return a single result.
        //Analyze data changes over time.
        { $match: { createdAt:{ $gte: lastYear } } },  // gte: greater than
        {
            $project: {
                month: {$month : "$createdAt"},
            },
         },
         {
            $group: {
                _id: "$month", 
                total: {$sum: 1},
            }

         }

        ]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;