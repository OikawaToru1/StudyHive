import multer from "multer";

// Disk storage is suitable for locally hosted projects or when server has a good file directory system maintaind 

// const storage = multer.diskStorage({
//     destination : function (req, file, cb){
//         cb(null, './assets')
//     },
//     filename : function (req, file, cb){
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9)
//         cb(null, file.fieldname+ '-' + uniqueSuffix)
//     }
// })

// memory storage is easier to deploy and handle as it stores stuffs in servers ram hahahaah

const storage = multer.memoryStorage()

export const upload = multer({storage : storage})