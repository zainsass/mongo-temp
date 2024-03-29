const { response } = require("express");
const express = require ("express");
const { request } = require("http");
const mongoose =require("mongoose");
const cors = require("cors")
const app=express();
app.use(cors())
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
res.json(user)
}
catch (error){res.status(500).send(error)}
})

app.get("/",async(req,res)=>
{ const users = await userModel.find({})
res.send(users)}
)
//new get for find by idor namee
app.get("/get/:name",async(req,res)=>
{  const isd = req.params.name
     const usree= await userModel.findOne({userId:isd})  
    res.send(usree)
}
)


app.put("/put/:id",async function (req,res){
    try {
        const sas = req.params.id;
        const upd = req.body
        const result = await userModel.findByIdAndUpdate(sas,upd)
        res.send("dosne")
    } 
    catch (error) {console.log("put err")
        
    }
})
//Checking existing name or not

app.post('/postn', function (req, res, next) {

    //Query the database for that name
    Urls.findOne({'name': req.body.name}, function (err, name) {
        //If a result is returned, throw an error
        if (name) {
            res.send({available: false});
        }
        //If not result - its unique and we can continue. 
        if (!name) {
            Urls.create(req.body, function (err, post) {
                if (err) return next(err)
                res.json(post)
            })
        }

    });
})


app.delete("/delete/:id",async function (req,res)
{
    try {
        const dlt= req.params.id;
        const result = await userModel.findByIdAndDelete(dlt)
        res.send("deleted")
        
    } catch (error) {res.send("error hhhwooy")
        //sasasjdsaaaaaaaaaaaaaaaaa
    }
}
)

var server=app.listen(port,function(){console.log("aaapp runing on port8080")})
