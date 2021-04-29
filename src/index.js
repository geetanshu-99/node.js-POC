const express =require('express');
const hbs = require('hbs');
const path = require('path')
require('./db/mongoose')

const app= express();
const port = process.env.PORT || 3000
const userRouter = require('./routers/user')

const publicDirectoryPath = path.join(__dirname,'../public');

app.use('/',express.static(publicDirectoryPath))

app.use(express.json());
app.use(userRouter);


app.listen(port, ()=>{ 
    console.log('Server is up on port '+ port)
})