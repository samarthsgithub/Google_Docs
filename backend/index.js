const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const linkRoutes  = require('./routes/linkRoutes');
const Document = require('./models/Document');
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const {Server} = require('socket.io');





app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization','x-auth-token']
}));

const io = new Server(server,{
     cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
     }
});

connectDB();

io.on('connection',(socket)=>{
    console.log('a user connected');
   
    socket.on('joinDoc',(docId)=>{
        socket.join(docId);
        console.log(`User joined document:${docId}`);
    });

    socket.on('docChanges',(data)=>{
    const{docId,changes} = data;
    console.log(`Changes received for document ${docId}:`, changes);
    socket.to(docId).emit('receiveChanges',changes);
    });

    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
});

server.listen(3001,()=>{
    console.log('Server is running on port 3001');
})

//Initailise Middleware
app.use(cors());
app.use(express.json({extended:false}));


//Define Routes
app.use('/',authRoutes);
app.use('/',documentRoutes);
app.use('/',linkRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`));

