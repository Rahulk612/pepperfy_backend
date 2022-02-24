const express = require("express")

const app = express();

const connect = require("./src/configs/db")

const Seettes = require("./src/modules/Products/SeettesModel")

const Beds = require("./src/modules/Products/BedsModel")

const Home = require("./src/modules/Products/wfhModel")

const Lamps = require("./src/modules/Products/lampsModel")

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


app.listen(process.env.PORT || 4090,async()=>{
    try{
    connect()
    console.log("Server is Runnig 4090")
    }catch(err){
        console.log(err.message)
    }
})