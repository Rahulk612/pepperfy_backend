const express = require("express")
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");



app.use(express.json());
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connect = require("./src/configs/db")

const Seettes = require("./src/modules/Products/SeettesModel")

const Beds = require("./src/modules/Products/BedsModel")

const Home = require("./src/modules/Products/wfhModel")

const Lamps = require("./src/modules/Products/lampsModel")

const NewUsers = require("./src/modules/Products/UserModel")

const Cart = require("./src/modules/addCartModel")

const Single = require("./src/modules/singleCartModel")

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4090");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept");

  next();
});


app.get("/pepperfry/seettes", async (req, res) => {
  try {
    const products = await Seettes.find();

    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.get("/pepperfry/workfromhome",async(req,res)=>{
  try {
    const home = await Home.find();

    res.status(200).send(home);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/pepperfry/lamps", async (req, res) => {
  try {
    const lamps = await Lamps.find();

    res.status(200).send(lamps);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/", async(req,res)=>{
    res.send("Hello Pepperfry")
})

app.get("/pepperfry/beds",async(req,res)=>{
    try {
      const beds = await Beds.find();

      res.status(200).send(beds);
    } catch (err) {
      res.status(500).send(err.message);
    }
});



app.post("/pepperfry/registration", async(req,res) => {
  try {
    let user = await NewUsers.findOne({ email: req.body.email });
    if (user)
      return res
        .status(404)
        .send("This email is already registered try new email");

    user = await NewUsers.create({
      name: req.body.name,
      number: req.body.number,
      email: req.body.email,
      password: req.body.password,
    });


    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err.message);
  }
})




app.post("/pepperfry/login",async (req,res) => {
   try {
    console.log("UserLogin");
    let user = await NewUsers.findOne({
      email: req.body.email,
    });
    if (!user) return res.status(404).send({ message: "Invalid user" });


    const match = user.checkPassword(req.body.password);

    if (!match)
      return res.status(401).send({ message: "Password is incorrect" });

    res.status(201).send(user)
  }catch(err){
    res.status(500).send(err.message);
  }
})


app.get("/pepperfry/users",async(req,res) => {
  try {
    let users = await NewUsers.find();


    res.status(200).send(users)
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Cart Items

app.post("/pepperfry/cartItems",async(req,res)=>{
  try {
    const user = await NewUsers.findOne({ _id: req.body.user_id });
    if (!user) return res.status(500).send("Invalid user or user not exist");

    // console.log("user found",user.name)
    const find = await Cart.findOne({user_id:req.body.user_id})
    if (find) {
      const single = await Single.create({item:req.body.item})
      find.items.push(single);
      let update = await Cart.findByIdAndUpdate(find._id,find,{new:true})
      console.log(update)
     return res.status(200).send(update)
    }
    const item = await Cart.create(req.body);
    res.status(200).send(item);
  } catch (err) {
    console.log("error",err.message);
  }
})

app.get("/pepperfry/cartItems/:id", async (req,res) => {
  try {
    const user = await NewUsers.findOne({_id:req.params.id})

    if(!user) return res.status(400).send("Invalid user")

    const items = await Cart.find({user_id:req.params.id})

    res.status(200).send(items)
  } catch (err) {
    console.log(err.message);
  }
})

app.get("/pepperfry/cartItems",async(req,res)=> {
  try {

    let items = await Cart.find();

    res.status(200).send(items)
  } catch (err) {
    console.log(err.message);
  }
});




app.listen(process.env.PORT || 4090,async()=>{
    try{
    await connect()
    console.log("Server is Runnig 4090")
    }catch(err){
        console.log(err.message)
    }
})