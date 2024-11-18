const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listingSchema=new Schema({
  title: {
    type: String,
    required: true, // Isko add karna zaruri hai agar `title` har entry ke liye mandatory hai.
},
    
  description:String,

  image:{
    type:String,
    default:"https://media.istockphoto.com/id/498058082/photo/warrior-pose-from-yoga.jpg?s=1024x1024&w=is&k=20&c=L6H7fJv0GIEsHmrVbfyZY9L_OK32sf1ES_8hRQdGZ78=",
    set:(v)=> v ==""
     ? "https://media.istockphoto.com/id/498058082/photo/warrior-pose-from-yoga.jpg?s=1024x1024&w=is&k=20&c=L6H7fJv0GIEsHmrVbfyZY9L_OK32sf1ES_8hRQdGZ78=":v,
  },
  price:Number,
  location:String,
  country:String
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports=Listing;