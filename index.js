const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require("path");
const Listing=require("./models/listing.js");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");


app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const MONGOURL="mongodb://127.0.0.1:27017/wonderlust";
main().then(()=>{
  console.log('connection sucesss');
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(MONGOURL);
}


app.get("/",(req,res)=>{
  res.send("please go for testlisting route");
})

app.get("/testlisting",async (req,res)=>{
  let sampleListings = new Listing({
    title:"my new villa",
    description:"by the beech",
    price:1200,
    location:"Mumbai",
    country:"India",
  });
  let listing = await sampleListings.save();
  console.log(listing);
  res.send("how are you");
})

//index route 
app.get("/listings", async (req, res) => {
  let alllisting = await Listing.find({});
  res.render("listings/index", { alllisting }); // Correct path without leading "/"
});

//new form 
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs" );
})
//crate new route
app.get("/listings/:id", async (req,res)=>{
  let {id}=req.params;
 const listing=await Listing.findById(id);
 res.render("listings/show",{listing} );
})

app.post("/listings",async (req,res)=>{
  let newlisting=new Listing(req.body.listing);
  await newlisting.save();
  console.log(newlisting);
  res.redirect("/listings");
})
//edit route
app.get("/listings/:id/edit",async (req,res)=>{
  let {id}=req.params;
  const listing= await Listing.findById(id);
  res.render("listings/edit",{listing});
})
//update route
app.put("/listings/:id", async (req,res)=>{
  let {id}=req.params;
 let change= await Listing.findByIdAndUpdate(id,{...req.body.listing});
 console.log(change);
  res.redirect("/listings");
})
//delete route
app.delete("/listings/:id",async (req,res)=>{
  let {id}=req.params;
  const deltelist= await Listing.findByIdAndDelete(id);
  console.log(deltelist);
  res.redirect("/listings");
})



app.listen(3000,()=>{
  console.log("app is listning");
})