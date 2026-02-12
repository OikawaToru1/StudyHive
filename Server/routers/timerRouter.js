import { Router } from "express";
import {PrismaClient} from '../generated/prisma/index.js'

const timerRouter = Router();
const prisma = new PrismaClient();

timerRouter.post('/start',(req, res)=>{
    console.log("todo timer is started just now , session number", req.body);
    res.send("Timer started",req.body)
})

timerRouter.post('/complete',async(req,res)=>{
    console.log(req.body, "complete data", req.user);
    if(req.body)
    {
        try {

            const updatedUser = await prisma.user.update({
                where : {
                   id : req.user.id
                },
                data : {
                    sessions : req.body.totalSession
                }
            })
            
        } catch (error) {
            console.log("Update garni bela error ayo ")
        }
    }

    res.send(req.body)
});




export default timerRouter;