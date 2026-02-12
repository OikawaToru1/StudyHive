import { Router } from "express";
import {PrismaClient} from '../generated/prisma/index.js'
import { ensureAdmin } from "../middleware/admin.js";

const prisma = new PrismaClient()
const adminRouter = Router();
adminRouter.use(ensureAdmin);

adminRouter.get('/users',async(req,res)=>{
    const allUsers = await prisma.user.findMany();
    console.log("All users",allUsers);
    res.json(allUsers)
});

adminRouter.get('/notes',async(req,res)=>{
    const allNotes = await prisma.notes.findMany()
    console.log("All users",allNotes);
    res.json(allNotes);
});

adminRouter.delete('/user',async(req,res)=>{
    const username = req.body.username;
    const deleteUser = await prisma.user.delete({
        where : {
            username : username
        }
    });
    console.log('deleteUser');
    res.send("User deleted succesfully");
});

adminRouter.delete('/notes',async(req,res)=>{
    const noteId = req.body.id;
    const deletedNote = await prisma.notes.delete({
        where : {
            id : noteId
        }
    });

    console.log(deletedNote);
});

export default adminRouter;