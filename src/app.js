const express = require("express");
const {adminAuth, userAuth} = require("./midddleware/auth");

const app = express();

//admin authentication (middlewares)
app.use('/admin', adminAuth)


//admin APIs
app.get('/admin/getUserData', (req, res)=>{
    res.status(200).send({"first_name": "Prabh"})
})

app.delete('/admin/deleteUserData', (req, res)=>{
    res.status(200).send({"first_name": "Prabh", "status": "Deleted"})
})


//user APIs and authentication

app.post('/user/login', (req, res, next) => {
    res.send('Login API')
})

app.use('/user', userAuth)

app.get("/user/:id", 
    [(req, res, next)=>{
        console.log('next1');
        next();
    },
    (req, res, next)=>{
        console.log('next2');
        res.send(`Hello user ${req.params.id}`);
    }]
)

app.post("/user/:id", (req, res)=>{
    res.send({'user':req.params.id, 'is_active':true});
})

app.delete("/user/:id", (req, res)=>{
    res.send({'user':req.params.id, 'is_active':false});
})


//Default route hamdler
app.use("/", (req, res)=>{
    res.send('Default handler')
})

app.listen(8080, ()=>{console.log('Listening.....')});