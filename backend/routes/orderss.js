const router = require("express").Router();
const { response } = require("express");
let Order = require("../models/orders");

//Create User
router.route("/add").post((req,res)=>{

    const fuelType = req.body.fuelType;
    const amount = req.body.amount;
    const orderDate = req.body.orderDate;
    const deliveryDate = req.body.deliveryDate;
    const price = req.body.price;

    const newOrder = new Order({

        fuelType,
        amount,
        orderDate,
        deliveryDate,
        price

    })

    newOrder.save().then(()=>{
        res.json("New Order Created")
    }).catch((err)=>{
        console.log(err)
    })

})

//View Orders
router.route("/").get((req,res)=>{

    Order.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async (req, res) =>{
    let userId = req.params.id;
    const {
            fuelType,
            amount,
            orderDate,
            deliveryDate,
            price} = req.body;

    const updateAdmin = {

        fuelType,
        amount,
        orderDate,
        deliveryDate,
        price
    }

    const update = await Order.findByIdAndUpdate(userId, updateAdmin)
    .then(()=>{
        res.status(200).send({status: "Order Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating order",error:err.message});
    })
})

//Delete User by ID
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Order.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Order deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete order",error:err.message})
    })
})

//View user by ID
router.route("/get/:id").get(async(req, res) =>{
    let userId = req.params.id;
    const user = await Order.findById(userId)
    .then((admin)=>{
        res.status(200).send({status: "order fetched", admin})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get order",error:err.message})
    })
})

//Search 
 
router.get('/search/:searchInput', async (req, res) => {
    try {
      const { searchInput } = req.params;
      const users = await Order.find({
        $or: [
          { NIC: { $regex: searchInput, $options: 'i' } },
        ],
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;