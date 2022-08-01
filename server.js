const { response } = require("express");
const express = require ("express");
const { request } = require("http");
const mongoose =require("mongoose");
const app=express();
app.use(express.json());
// mongooosse connection
mongoose.connect('mongodb+srv://admin:1234@contact-cluster.lfspc.mongodb.net/contacts',function(){console.log("db connected")})
var port= process.env.PORT ||8080;
//schema 
const userSchema = mongoose.Schema({
    name:String,
    number:String,
    email:String,

})
const userModel = mongoose.model('contact_DB',userSchema)

app.post("/post",async (req,res)=>
{ const user = userModel( req.body); 
try
    {await user.save();
//response.send(user)
res.send("DATA ADDED")
}
catch (error){res.status(500).send(error)}
})

app.get("/",async(req,res)=>
{ const users = await userModel.find({})
res.send(users)}
)

app.put("/put/:id",async function (req,res){
    try {
        const sas = req.params.id;
        const upd = req.body
        const result = await userModel.findByIdAndUpdate(sas,upd)
        res.send("done")
    } 
    catch (error) {console.log("put err")
        
    }
})

app.delete("/delete/:id",async function (req,res)
{
    try {
        const dlt= req.params.id;
        const result = await userModel.findByIdAndDelete(dlt)
        res.send("deleted")
        
    } catch (error) {res.send("error")
        
    }
}
)

var server=app.listen(port,function(){console.log("aaapp runing on port8080")})