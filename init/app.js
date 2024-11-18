const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

const MONGOURL="mongodb://127.0.0.1:27017/wonderlust";
main().then(()=>{
  console.log('connection sucesss');
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(MONGOURL);
}

const initDB = async ()=>{
   await Listing.deleteMany({})
   await Listing.insertMany(initdata.data);
   console.log(initdata.data);
}
initDB();