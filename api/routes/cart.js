
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try { // this two paramtrs (user.id, what i am going to update)
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true } // if you just set the body it not update (to prevent we use this true)
        );
        res.status(200).json(updatedCart);
    } catch (err) { res.status(500).json(err) };
});

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted....!")
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER Cart
// only admin can get the product
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL 

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch(err) {
        res.send(500).json(err);
    }
});


module.exports = router;