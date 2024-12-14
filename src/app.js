const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

const app = express();


app.use(express.json());

app.post('/user', async (req, res)=>{
    const user = new User(req.body);
    try {
        await User.create(user);
        res.send("User added successfully.");
    }
    catch (err) {
        res.status(400).send("Error while adding user: " + err.message);
    }
});

app.get('/feed', async (req, res)=>{
    var data = [];
    try {
        data = await User.find();
        if (!data.length){
            res.status(404).send("Users not found");
        }
        else{
            res.send({"message" : "Feed refreshed successfully.", "data" : data});
        }
    }
    catch (err) {
        res.status(400).send("Error while refreshing feed: " + err.message);
    }
});

app.get('/search', async (req, res)=>{
    const emailId = req.body.emailId;
    var data = [];
    try {
        data = await User.find({"emailId" : emailId});
        if (!data.length){
            res.status(404).send("User not found");
        }
        else{
            res.send({"message" : "User fetched successfully.", "data" : data});
        }
    }
    catch (err) {
        res.status(400).send("Error while fetching user: " + err.message);
    }
});

app.delete('/delete', async (req, res)=>{
    const emailId = req.body.emailId;
    const user = await User.findOne({"emailId":emailId});
    try {
        if (!user){
            res.status(404).send("User not found");
        }
        else{
            const data = await User.findByIdAndDelete(user._id);
            res.send({"message" : "User deleted successfully.", "data" : data});
        }
    }
    catch (err) {
        res.status(400).send("Error while deleting user: " + err.message);
    }
});

app.patch('/user', async (req, res) => {
    const emailId = req.body.emailId;
    const user = await User.findOne({"emailId":emailId});
    try{
        if (!user) {
            res.status(404).send("User not found");
        }
        else {
            const data = await User.findByIdAndUpdate(user._id, req.body.fields_to_update, {returnDocument: 'after', runValidators: true});
            res.send({"message" : "User data updated successfully.", "data" : data});
        }
    }
    catch(err) {
        res.status(400).send("Error while updating user: " + err.message);
    }
})

//Default route hamdler
app.use("/", (req, res)=>{
    res.send('Default handler')
})

connectDB().then(()=>{
    console.log("DB Connection Successful");
    app.listen(8080, ()=>{console.log('Listening on port 8080')});
}).catch((err)=>{
    console.error(err);
});