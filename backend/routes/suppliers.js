const router = require("express").Router();
let supplier = require("../models/supplier");

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const NIC = req.body.NIC;
    const contactNumber = req.body.contactNumber;
   
    const newsupplier = new supplier({
        name,
        address,
        email,
        NIC,
        contactNumber
    })

    newsupplier.save().then(()=>{
        res.json("Supplier Added")
    }).catch((err) => {
        console.error(err);
        if (err.code === 11000) {
            res.status(400).send('Duplicate key error. Email already exists.');
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
})


router.route("/").get((req,res)=>{

    supplier.find().then((suppliers)=>{
        res.json(suppliers)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req,res) => {
     let userId = req.params.id;
     const {name, address, email, NIC, contactNumber} = req.body;

     const updatesupplier = {
        name,
        address,
        email,
        NIC,
        contactNumber,
    
     }

     const update = await supplier.findByIdAndUpdate(userId,updatesupplier)
     .then(() => {
        res.status(200).send({status: "Supplier updated"})
     }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
     }) 
})

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await supplier.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Supplier deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Ërror with deleting Supplier", error: err.message});
    })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await supplier.findById(userId)
    .then((supplier) => {
        res.status(200).send({status: "Supplier fetched", supplier})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Ërror with getting Supplier",error: err.message});
    })
})

//search
router.get('/search/:searchInput', async (req, res) => {
    try {
      const { searchInput } = req.params;
      const users = await supplier.find({
        $or: [
          { name: { $regex: searchInput, $options: 'i' } },
          { address: { $regex: searchInput, $options: 'i' } },
          { email: { $regex: searchInput, $options: 'i' } },
          { NIC: { $regex: searchInput, $options: 'i' } },
          { contactNumber: { $regex: searchInput, $options: 'i' } },
        ],
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;