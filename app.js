const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs"); // for using ejs we need this line of code
app.use(express.static("public")); // to use css in our project
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/plans',{ useNewUrlParser: true, useUnifiedTopology: true});

const planSchema = new mongoose.Schema({
    text:String
});

const Plan = mongoose.model('Plan',planSchema);

app.get("/",(req,res)=>{
    
    Plan.find({},(err, findPlans)=>{
        res.render("plans",{
        plans:findPlans
        });
    });
});

app.post("/",(req,res)=>{
    const newSecret = req.body.newSecret;

    const newPlan = new Plan({
        text:newSecret
    });

    newPlan.save();
    res.redirect('/');    
});

app.post("/delete",(req,res)=>{
    const checkedPlanId = req.body.checkbox;
    Plan.findByIdAndRemove(checkedPlanId, err =>{
        if(!err){
            res.redirect("/");
        }
    });
});

app.listen(3000,()=>{
    console.log('running on port 3000');
});