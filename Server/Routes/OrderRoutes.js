import express  from "express"; 
import asyncHandler from "express-async-handler";
import {protect} from "../Middleware/AuthenMiddleware.js";
import Order from "../Models/OrderModel.js";


const orderRouter = express.Router()


// CREATE ORDER
orderRouter.post("/",protect,
 asyncHandler(async(req,res) =>{
    const {orderItems , shippingAddress, paymentMethod, itemsPrice , taxPrice, shippingPrice , totalPrice  } = req.body
    console.log(req._id)
        
    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items")
    }
    else {
        const order = new Order({orderItems , user: req.user._id, shippingAddress, paymentMethod, itemsPrice , taxPrice, shippingPrice , totalPrice  })
        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }

        

    }
))


//  GET ORDER FROM ID 

orderRouter.get("/:id",protect,
 asyncHandler(async(req,res) =>{
    const order = await Order.findById(req.params.id).populate(
        "user" , "name email"
    )
        
    if(order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error ("Order not found ")
    }

        

    }
))


// ORDER IS PAID
orderRouter.put("/:id/pay",protect,
 asyncHandler(async(req,res) =>{
    const order = await Order.findById(req.params.id)
        
    if(order) {
        order.isPaid = true
        order.paidAt = Date.now
        order.paymentResul = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = await order.save()
        res.json(updateOrder)
    }
    else {
        res.status(404)
        throw new Error ("Order not found ")
    }

        

    }
))

//  USER LOGIN ORDERS

orderRouter.get("/",protect,
 asyncHandler(async(req,res) =>{
    const order = await Order.find({user: req.user._id}).sort({_id:-1})
    
        res.json(order)
  
        

    }
))





export default orderRouter