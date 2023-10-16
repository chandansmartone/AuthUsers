const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('./Models/userModel')
//connect to express app
const app=express()
//connect to mango
const SECRET_KEY = "secretkey"
const dbURI='mongodb+srv://Chandan:Chandu2001@cluster30.sb9xuw4.mongodb.net/UsersDB?retryWrites=true&w=majority'
mongoose
.connect(dbURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    app.listen(3001,()=>{
        console.log("server is connected to port 3001\nmangoDb connected")
    })
})
.catch((error)=>{
    console.log("sorry unable to connect",error);
})
//middleware
app.use(bodyParser.json())
app.use(cors())

//routes
//user Registratio
app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, username, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error signing up' })
    }
})

//get all users
app.get('/register',async(req,res)=>{
    try{
        const users=await User.find()
        res.status(201).json(users)
    }catch(error){
        res.status(500).json({error:"enable to get user"})
    }
})
//get Login
app.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body
        const user=await User.findOne({username})
        if(!user){
            return res.status(401).json({error:'Invalid credentials'})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({error:"Wrong password"})
        }
        const token=jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:'1min'})
        res.json({message:"Login successful"})

    }catch(error){
        res.status(500).json({error:"error logging in"})
    }
})
