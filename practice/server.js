const express = require("express");
let server = express();

server.get("/",function(req,res){
    // res.send("SEN WIN hehe");
    res.send({name:"yanic",rank:"plat 3"})
})

server.listen(3000);
