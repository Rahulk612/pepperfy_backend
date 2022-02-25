const express = require("express")

const app = express();


app.use(express.json());

const connect = require("./src/configs/db")

const Seettes = require("./src/modules/Products/SeettesModel")

const Beds = require("./src/modules/Products/BedsModel")

const Home = require("./src/modules/Products/wfhModel")

const Lamps = require("./src/modules/Products/lampsModel")

const NewUsers = require("./src/modules/Products/UserModel")


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






app.listen(process.env.PORT || 4090,async()=>{
    try{
    connect()
    console.log("Server is Runnig 4090")
    }catch(err){
        console.log(err.message)
    }
})