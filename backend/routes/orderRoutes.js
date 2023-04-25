import express from 'express';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler'
import Order from '../models/OrderModel.js'
import { isAuth } from '../utils.js';
// import bcrypt from 'bcryptjs';
const orderRouter=express.Router();




orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);




orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    
  })  
);








orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({

      // Why Map ->order router mai orderitems ek refrence hai or har producy ki id nikalna hai
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();

    // Yeh order placeorderscreen se aaya hai naya wala order.id wala

    res.status(201).send({ message: 'New Order Created', order });
  })
);






orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid And Confirmed', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);




export default orderRouter;

