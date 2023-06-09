import HttpStatusCode from "../exceptions/HttpStatusCode.js"
import jwt from 'jsonwebtoken'
import {User} from '../model/index.js'
import Exception from "../exceptions/exception.js"
function checkToken(req, res, next) {
    // by pass login,register
    // let url = "http://localhost:3002";
    // if (req.url.toLowerCase().trim() == '/users/login'.toLowerCase().trim()
    //     || req.url.toLowerCase().trim() == '/users/register'.toLowerCase().trim()) {
    //     next()
    //     return
    // }
    //other request
    //get and validate token
    const token = req.headers?.authorization?.split(" ")[1]
    try {
    //encrypt token => data
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        const isExpired = Date.now() >= jwtObject.exp * 1000
        if (isExpired) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: 'Token is expired'
            })
            res.end()
        } else {
            next()
            return
        }

    } catch (exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.message
        })
    }

}
//check role
async function checkUser(req, res, next) {
    const token = req.headers?.authorization?.split(" ")[1]
    try {
    //encrypt token => data
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
       
        if(jwtObject.data.roleId >= 1){
            
            next();
            return
        }else throw new Exception('Not permission, you must be customer or higher')
    } catch (exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: 'Not permission'
        })
    }
}
// async function checkMentor(req, res, next) {
//     const token = req.headers?.authorization?.split(" ")[1]
//     try {
//     //encrypt token => data
//         const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
       
//         if(jwtObject.data.roleId >= 2){
//             next();
//             return
//         }else throw new Exception('Not permission, you must be mentor or higher')
//     } catch (exception) {
//         res.status(HttpStatusCode.BAD_REQUEST).json({
//             message: 'Not permission'
//         })
//     }
// }
async function checkStaff(req, res, next) {
    const token = req.headers?.authorization?.split(" ")[1]
    try {
    //encrypt token => data
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        if(jwtObject.data.roleId >= 3){
            next();
            return
        }else throw new Exception('Not permission, you must be staff or higher')
    } catch (exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: 'Not permission'
        })
    }
}
async function checkAdmin(req, res, next) {
    const token = req.headers?.authorization?.split(" ")[1]
    try {
    //encrypt token => data
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        if(jwtObject.data.roleId == 4){
            next();
            return
        }else throw new Exception('Not permission, you must be admin or higher')
    } catch (exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: 'Not permission'
        })
    }
}
export {
    checkToken,
    // checkCustomer,
    // checkMentor,
    checkUser,
    checkStaff,
    checkAdmin,
}