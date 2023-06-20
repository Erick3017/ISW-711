

const jsonData= require('./countrys.json');
const express = require('express');
const request = require("request");
const bodyParser = require("body-parser");
 

const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors({
    domains: '*',
    methods: "*"
  }));
  
app.use(express.json());


app.get("/countrys", async (req, res) =>{        
    try{
        res.json(
            jsonData
        )
        
    }catch(err){
        res.status(500).json(err);
    }
})

app.get("/:id", async (req, res) =>{        
    try{
        request(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${req.params.id}.json`,(err,response,body)=>{
        if (!err){                        
            res.json(
                body
            )
        }
    })
    }catch(err){
        res.status(500).json(err);
    }
})
app.listen(3333,()=>{
    console.log("Connected to backend in the port 3333")
});