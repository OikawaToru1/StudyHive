export const ensureAdmin = (req,res, next)=>{
    console.log(req.user);
    return next()
}