const express=require('express')
const app=express()
app.use(express.json())
const mongoose=require('mongoose')
const url="mongodb+srv://admin:admin@cluster0.izyvf.mongodb.net/firstDatabase?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
const data=require('./model')

const bodyParser=require('body-parser');
const cors=require('cors')
//server
const corsOption = {
    origin:'http://localhost:5000/'
}
//Parsing the req body in bodyparser middleware and enabling cors
app.use(bodyParser.json())
app.use(cors(corsOption))


//get list of celebrity
app.get('/',async function(req,res){
    try{
        const user=await data.find()
        res.send(user)
    }
    catch(error)
    {
        res.status(500)
        res.json({message:"The user information could not be retrieved."})
    }
    finally{
        res.end()
    }
})

//get particular celebrity details
app.get('/:id',async function(req,res){
    try{
        const user=await data.findOne({celebrity_id:req.params.id})
        res.send(user)
    }
    catch(error)
    {
        res.status(500)
        res.json({message:"The user information could not be retrieved."})
    }
    finally{
        res.end()
    }
})

//posting celebrity details
app.post('/',async function(req,res){
    try{
        const user=await new data(req.body)
        await user.save()
        res.status(201)
        res.send(user)
    }
    catch(e){
            res.status(500)
            res.json({message:"There was an error while saving the user to the database"})
    }
    finally{
        res.end()
    }
})

//Update celebrity detail based on id
app.put('/:id',async function(req,res){
    try{
        const user=await data.updateOne({"celebrity_id":req.params.id},req.body)
        if(user.nModified==1){
            res.status(200)
            res.send(user)
        }
        else
        {
            res.status(404)
            res.json({message:"The celebrity with the specified ID does not exist."})
        }
    }
    catch(e)
    {
        res.status(500)
        res.json({message:"The celebrity information could not be retrieved."})
    }
    finally{
        res.end()
    }
})


//Delete celebrity detail based on id
app.delete('/:id',async function(req,res){
    try{
        const user=await data.findOneAndDelete({"celebrity_id":req.params.id})
        if(user){
            res.status(200)
            res.send(user)
        }
        else
        {
            res.status(404)
            res.send({message:"The celebrity with the specified ID does not exist."})
        }
    }
    catch(e)
    {
        res.status(500)
        res.json({message:"The celebrity information could not be retrieved."})
    }
    finally{
        res.end()
    }
})

//starting the server
app.listen(5000,()=>console.log("Server running"))
