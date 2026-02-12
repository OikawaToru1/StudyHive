import { Router } from "express";
import {PrismaClient} from '../generated/prisma/index.js'

const todoRouter = Router();

todoRouter.post('/create',(req,res)=>{
    console.log(req.body, 'to create todo');
    // js add todos to db when necessary !
});

todoRouter.delete('/delete/:deleteId',(req,res)=>{
    console.log('delete todo', req.body);
})

export default todoRouter