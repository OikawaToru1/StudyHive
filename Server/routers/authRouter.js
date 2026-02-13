import { Router } from "express";
import {signup} from '../controller/authController.js'
import passport from "passport";
import LocalStrategy from 'passport-local'
import {ensureAuthenticated} from '../middleware/auth.js'

const authRouter = Router();

authRouter.get('/signup',(req,res)=>{
    res.send("Signup get from server")
});
authRouter.post('/signup',signup)
authRouter.get('/login',(req,res)=>{
    res.send('login get request')
})

authRouter.post('/login',async (req, res)=> {

     passport.authenticate('local',  (err, user, msg)=>{
        if(err)
        {
            return res.status(500).json({error: msg})
        }
        if( !user)
        {
            return res.json({error: msg})
        }

        req.login(user,(err)=>{
            if(err)
            {
                res.status(500).json({error: err})
            }
            return res.status(200).json({username: user.username, valid: true, totalSessions :user.sessions })
        })
    })(req,res)
})

authRouter.get('/google', passport.authenticate('google',{scope : ['profile','email']}))
authRouter.get('/google/callback',
    passport.authenticate('google',{failureRedirect: '/'}),(req,res)=>{
        console.log('authenticate body', req.body)
        //  res.status(200).json({valid:true, user : req.user})
         return res.redirect('http://localhost:5173/home')
        // return res.status(200).json({valid: true})
    }
)

authRouter.get('/logout', (req,res)=>{
    console.log(req.user,'you wanna log out ?')
    req.logout((err)=>{
        if(err)
        {
            return res.status(500).json({message: err})
        }
        res.status(200).send('done with your ass')
    })
})

authRouter.get('/me',ensureAuthenticated,(req,res)=>{
    res.json({valid : true, username: req.user.username})
})

export default authRouter


