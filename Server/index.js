import 'dotenv/config'
import {PrismaClient} from './generated/prisma/index.js'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import {createServer} from 'node:http'
import {Server} from 'socket.io'
import authRouter from './routers/authRouter.js'
import todoRouter from './routers/todoRouter.js'
import timerRouter from './routers/timerRouter.js'
import adminRouter from './routers/adminRouter.js'
import {v2 as cloudinary} from 'cloudinary'
import { upload } from './middleware/multer.js'
import { uploadToTCloudinary } from './cloudinary/fileUpload.js'
import Groq from 'groq-sdk'


const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const groq = new Groq({
    apiKey : process.env.GROQ_API_KEY
})

const io = new Server(server,{
    cors : {
        // origin : 'http://localhost:5173',
        origin : '*',
        credentials : true,
    },
    connectionStateRecovery : {}
});


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({secret: "cats", resave: false , saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/',(req, res)=> res.send("Hello fren"));


app.use('/api/auth',authRouter);
app.use('/api/todos',todoRouter);
app.use('/api/pomo',timerRouter)
app.use('/api/admin',adminRouter);

app.get('/api/queries',(req,res)=>{
    res.send("You will get queries ");
});


app.post('/api/query/upload',(req,res)=>{
    console.log(req.body)
})
app.post('/api/file-query/upload',(req,res)=>{
    console.log(req.body)
})

app.post('/api/upload',upload.single('my_file'),async(req,res)=>{

    console.log(req.body,req.file, 'i have data from you?')
    const fileTitle = req.body.title;
    const fileDescription = req.body.description ;
    const fileName = req.file.filename;
    const creator = req.body.creator
    try {
        const result =  await uploadToTCloudinary(req.file.path)
        const newNote = await prisma.notes.create({
            data : {
                url : result,
                title : fileTitle,
                description : fileDescription,
                creator : {
                    connect : {
                        username : creator
                    }
                }
            }
        }).then(res=> console.log(res))
        .catch(err=> console.log(err))

        console.log('result :',result, "note creation :",newNote)
        res.send({url: result, title :fileTitle, description : fileDescription})  
    } catch (error) {
        res.json({status: "error", msg: 'something went wrong'})
    }
})
app.get('/api/files',async(req,res)=>{
    const files = await prisma.notes.findMany();
    // console.log(files, 'you have these files with you')
    res.send(files)
});

app.post('/api/ask-ai',async(req,res)=>{
    const {prompt} = req.body;

    try {

        const response = await groq.chat.completions.create({
            model : "openai/gpt-oss-20b",
            messages : [
                {role : "system", content : "You are a helpful assistant"},
                {role : "user", content : prompt}
            ]
        });
        res.json({
            answer : response.choices[0].message?.content
        })
        
    } catch (error) {
        console.log("error in asking ai ", error)
    }
})



app.get('/{*splat}',(req,res)=> res.send("No such url exists"))

async function mai(){
    const users = await prisma.user.findMany(
        {
            select : {
                username: true
            }
        }
    );
    console.log(users)

}

mai()

io.on("connection",async(socket)=>{

    console.log(socket.handshake.auth,'user data on connection')

    const allUsers = await prisma.user.findMany(
        {
            // You can filter users username and send others username
            select : {
                username: true
            },
        }
    );

    socket.emit('users', allUsers)
    socket.on('user-connect',(sender, receiver)=>{
        const dynamicEvent = sender + '-' + receiver;
        //If this doesnot work , the event, try `${user.username}-${username}`
        console.log("Dynamic event", dynamicEvent)
        socket.on(dynamicEvent,(message)=>{
            console.log("Message send ", dynamicEvent, message)
            io.emit(dynamicEvent, message, sender)
        })
    })

    socket.on('disconnect',()=>{    
        console.log('User disconnected',socket.id)
    })

    socket.on('create-group',(message)=>{
        console.log('Group creation message :', message)
    })

    socket.on('join room',(roomName)=>{
        socket.join(roomName);
        console.log('User joined room :', roomName)
    })

    socket.on('leave room',(roomName)=>{
        socket.leave(roomName);
        console.log('User left room :', roomName)
    })

    socket.on('room message',(roomName, message, sender)=>{
        console.log('Room message :', roomName, message, sender)
        io.to(roomName).emit('room message', message, sender)
    })
})

server.listen(8080,()=>console.log("Im listening at port 8080"));


