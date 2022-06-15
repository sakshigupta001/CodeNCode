import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

var app= express();
var PORT= process.env.PORT || 4000;
const CodeXapi= "https://codex-api.herokuapp.com/";

app.use(cors());
app.use(express.json());

app.post("/", (req,res)=>{ 

    //res.send("NOW SERVER ACCESSED");

    const {code, input, language}= req.body;
    
    var program ={
        code: code,
        language,
        input
    };

    fetch(CodeXapi, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(program)
    })
    .then((res)=> {
        console.log("res json: ",res)
           return res.json();
    })
    .then(data=> {
        console.log("DATA:",data);
        res.send(data);
    })
    .catch(err=> console.log("ERR:",err));

});

app.listen(PORT,()=>{
    console.log(`Server listening at http://localhost:${PORT}`);
})