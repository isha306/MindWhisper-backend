const express = require("express")
const mongoose = require("mongoose")
const Users = require("./src/models/users")
const { register, login, findUser } = require("./src/controllers/users")
const server = express()
const cors = require("cors")
const { verifyToken, validateForm, isvalidated } = require("./src/Middlewares")
const { addForm } = require("./src/controllers/Form")
server.use(express.json())
server.use(cors())
const http = require("http")
const app = http.createServer(server)
const { Server } = require('socket.io')
const io = new Server(app)
const { join } = require('node:path');
const { sendEmail } = require("./src/helper/Email")
require("dotenv").config()

server.get("/", (req, res) => {

  res.status(200).json({
    uname: "isha",
    uphone: "8581027685"
  })
})
server.post("/register", register)
server.post("/login", login)
server.get("/get-user", verifyToken, findUser)
server.post("/addForm", validateForm, isvalidated, addForm,sendEmail)


const db = process.env.MONGO_URL


mongoose.connect(db)
  .then(data => console.log("Database Connected"))
  .catch(error => console.log(error))


server.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.on("message", (message,room) => {
    console.log(`New Message recived in ${room} and message is ${message}`);
    socket.to(room).emit("message",message)
  })
  socket.on("join", (room)=>{
    socket.join(room)
    socket.emit("joined")
  }) 
   
  
})
const port=process.env.PORT
app.listen(port, () => {
  console.log('server running at http://localhost:3000');
});