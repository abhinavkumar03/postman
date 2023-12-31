const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const socket = require("socket.io");
// const Server = require("socket.io");


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,        
}).then(()=>{
    console.log("DB Connection Successfull");
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server started on port ${process.env.PORT || 5000}`)
})

const io = socket(server,{
    cors:{
        origin: process.env.ORIGIN,
        credentials:true,
    }
});

// const io = Server(server);

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    console.log(" a user connected ");

    socket.on('disconnect', () => {
        console.log(" a user disconnected");
    });

    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });


    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
        }
    });

})
