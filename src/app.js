const express = require("express");

const app = express();

app.use("/abcd", (req, res)=>{
    res.send("Hello abcd");
})

app.listen(8080, ()=>{console.log('Listening.....')});