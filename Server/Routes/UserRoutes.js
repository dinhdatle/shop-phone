import express  from "express"; 
import User from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import protect from "../Middleware/AuthenMiddleware.js";


const userRouter = express.Router()


// LOGIN
userRouter.post("/login",
 asyncHandler(async(req,res) =>{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        

        if(user && (await user.matchPassword(password)))
        {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createAt: user.createdAt,
            })
           
        }
        else 
        {
            res.status(401)
            throw new Error("Invalid Email or Password")
        }

    }
))

// PROFILE
userRouter.get("/profile", protect,
 asyncHandler(async(req,res) =>{
       const user = await User.findById(req.user._id)
    //    console.log(user)

       if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createAt: user.createdAt,
        })
       }
       else{
            res.status(404)
            throw new Error("User not found")

       }

    }
))

// REGISTER

userRouter.post("/", 
 asyncHandler(async(req,res) =>{
    const {name,email,password} = req.body;
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,email,password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
           
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid User Data")
    }
      

    }
))


export default userRouter
