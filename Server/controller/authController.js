import {PrismaClient} from '../generated/prisma/index.js'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import GoogleStrategy from 'passport-google-oauth20'



const prisma = new PrismaClient();

passport.use(
    new LocalStrategy(async (username, password, done)=>{
        try {
            const isUser = await prisma.user.findUnique({
                where : {
                    username : username
                }
            })

            if(!isUser)
            {
                
                return done(null, false , isUser)
            }
            else if(isUser.password !== password)
            {
                console.log("wrong password bro")
                return done(null, false, {message : "Incorrect password buddy"})
            }
            else{
                return done(null, isUser)
            }
        } catch (error) {
            console.log(error)
            return done(error)
            
        }
    })
)

passport.use(
    new GoogleStrategy({
        clientID : process.env.GoAuth_clientID,
        clientSecret : process.env.GoAuth_clientSecret,
        callbackURL : 'http://localhost:8080/api/auth/google/callback'
    },

    async (accessToken, refreshToken, profile, done )=>{
        try {
            const user = await prisma.user.findFirst({
                where : {
                    googleId : profile.id
                }
            })

            if(user)
            {
                return done(null, user)
            }

            const newUser = await prisma.user.create({
                data : {
                    googleId: profile.id,
                    username : profile.displayName,
                    email : profile.emails[0].value
                }
            });
            done(null, newUser)

            
        } catch (error) {
            console.log(error)
            done(error)
        }
    }
)
)

passport.serializeUser((user, done)=>{
    // console.log('INside serialise, i have usernam...',user)
    done(null, user.username)
})

passport.deserializeUser(async (username, done)=>{
    // console.log("Im inside deseariliseee and i have ", username)
    try {
        const user = await prisma.user.findFirst({      
            where : {
                username : username
            }
        })
        done(null, user)
    } catch (error) {
        console.log(error)
        done(error)
    }
})


async function signup(req, res)
{   
    console.log('req :',req.body)
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log('from client to register',username, email, password)

    const userExists = await prisma.user.findMany({
        where : {
            username : username,
            email : email
        }
    })
    console.log('does user exist? ',typeof(userExists))

    if(userExists.length>0)
    {
        res.json({message : "User with similar creds already exists !!"})
    }
    else
    {
        const newUser = await prisma.user.create({
            data : {
                email : email,
                username : username,
                password : password
            }
        })
        console.log(newUser)
        console.log(req.user)
        res.json({message:'Register success!!', valid : true})
    }

}


export {signup}