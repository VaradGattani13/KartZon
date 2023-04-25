// import e from 'express';
import express from 'express'
import data from './data.js ';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import expressAsyncHandler from 'express-async-handler';

import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

import cors from 'cors'

mongoose.set('strictQuery', false);
dotenv.config();


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Database Connected Successfuly');
}).catch((e)=>{
    console.log('Connection Failed');

})

const app=express();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.get('/api/keys/paypal', (req, res) => {

    //sb ->sandbox
    res.send(process.env.PAYPAL_TOKEN || 'sb');
  });
  












app.use('/api/seed',seedRouter)




// Iska alag roye banalia
// app.get('/api/products',(req,res)=>{
//     res.send(data.products);
// })

app.use('/api/products',productRouter)

// User Router
app.use('/api/users',userRouter);



// Order Router
app.use('/api/orders',orderRouter);

 


// Prouctrouter file mai jama krdia sab
// app.get('/api/products/slug/:slug',(req,res)=>{
//     const product=data.products.find(x=>x.slug===req.params.slug);
//     if(product){
//      res.send(product);

//     }
//     else{
//         res.status(404).send({message:'Data Not Found..'})
//     }
//     res.send(data.products);
// })
 
 
// app.get('/api/products/:id',(req,res)=>{
//     const product=data.products.find(x=>x._id===req.params.id);
//     if(product){
//      res.send(product);

//     }
//     else{
//         res.status(404).send({message:'Data Not Found..'})
//     }
//     res.send(data.products);
// })
 



//Error Handling of userroutes.js
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
     
})









const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server Running at ${port}`);

})