import express from 'express'
import Product from '../models/productModel.js';
import data from '../data.js';

import User from '../models/userModel.js';
const seedRouter=express.Router();
seedRouter.get('/',async(req,res)=>{

    // Empty object parameter sare record dedea
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    // res.send({ createdProducts });



    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdProducts,createdUsers});


})

export default seedRouter;



//Start With Module 22
