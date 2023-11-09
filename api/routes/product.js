
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router();

//CREATE

router.post("/",verifyTokenAndAdmin, async (req, res)=>{
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
   
    try { // this two paramtrs (user.id, what i am going to update)
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true } // if you just set the body it not update (to prevent we use this true)
        );
        res.status(200).json(updatedProduct);
    } catch (err) { res.status(500).json(err) };
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted....!")
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET Product
// only admin can get the product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCT
// only admin can get the user
router.get("/", async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    // here (new) is the name of query means what you write after params or route.
    try {
        let products;

        if(queryNew){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }else if(queryCategory){
            products = await Product.find({categories:{
                $in:[queryCategory],
            },
        });
        }else{
            products = await Product.find(); //this will fetch all products inside out DB.
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;