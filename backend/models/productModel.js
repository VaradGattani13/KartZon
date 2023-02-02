import mongoose from "mongoose";


const productSchema=new mongoose.Schema({
    name: { type: String, required: true, unique: true },
slug: { type: String, required: true, unique: true },
category:{type:String,reuqired:true},

image: { type: String, required: true },
price: { type: Number, required: true },
countInStock: { type: Number, required: true },
brand: { type: String, required: true },

rating:{type:Number,required:true},
numReviews: { type: Number, required: true },
desription: { type: String, required: true },
},
{
    timestamps:true
}


)


const Product=mongoose.model('Product',productSchema);
export default Product;
