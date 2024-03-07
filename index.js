const express = require('express');
const app= express ();
const videoRoute = require('./routes/videos')
const PORT = process.env.PORT||8080;
require("dotenv").config();
const cors = require('cors');
app.use((cors({origin: "http://localhost:3000"})));

app.use(express.static('./public'));



app.listen (PORT , ()=>{
    console.log(`app is listening ${PORT}`)
})

app.use((req,_res,next)=>{
    console.log(`Incoming request: ${req.method} ${req.url}`);

    next();
})



app.use(express.json());

app.use('/videos',videoRoute);
