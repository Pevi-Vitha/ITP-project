const router = require("express").Router();
let order = require("../models/Order");

router.route("/add").post((req,res)=>{

    const fueltype = req.body.fueltype;
    const amount = req.body.amount;
    const orderdate = req.body.orderdate;
    const deliverydate = req.body.deliverydate;
    const price = req.body.price;

    const neworder = new order({

        fueltype,
        amount,
        orderdate,
        deliverydate,
        price
    })

    neworder.save().then(()=>{
        res.json("Order Placed")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{

    order.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req,res) => {
     let userId = req.params.id;
     const {fueltype, amount, orderdate, deliverydate, price} = req.body;

     const updateorder = {

        fueltype,
        amount,
        orderdate,
        deliverydate,
        price
     }

     const update = await order.findByIdAndUpdate(userId,updateorder)
     .then(() => {
        res.status(200).send({status: "Order details updated"})
     }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
     }) 
})

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await order.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Order details deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Ërror with deleting details", error: err.message});
    })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await order.findById(userId)
    .then((order) => {
        res.status(200).send({status: "Order fetched", order})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Ërror with getting details",error: err.message});
    })
})
//search
router.get('/search/:searchInput', async (req, res) => {
    try {
      const { searchInput } = req.params;
      const users = await order.find({
        $or: [
          { fueltype: { $regex: searchInput, $options: 'i' } },
          { amount: { $regex: searchInput, $options: 'i' } },
          { orderdate: { $regex: searchInput, $options: 'i' } },
          { deliverydate: { $regex: searchInput, $options: 'i' } },
          { price: { $regex: searchInput, $options: 'i' } },
        ],
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;