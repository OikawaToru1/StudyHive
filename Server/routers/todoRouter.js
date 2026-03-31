import { Router } from "express";
import {PrismaClient} from '../generated/prisma/index.js'

const todoRouter = Router();
const prisma = new PrismaClient()

todoRouter.post('/create',async(req,res)=>{
    console.log(req.body,req.user, 'to create todo');
    const username = req.body.username;

    const newTodo = await prisma .todos.create({
        data : {
            content : req.body,
            creator : {
                connect : {
                    username : username
                }
            }
        }
    })

    // js add todos to db when necessary !
});

todoRouter.delete('/delete/:deleteId',(req,res)=>{
    console.log('delete todo', req.body);
})

export default todoRouter