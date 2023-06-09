import express from 'express'
import { userControllers } from '../controller/index.js'

import {
    checkUser,
    checkStaff,
    checkAdmin
}
    from '../authentication/auth.js'
const router = express.Router()
//* 

// get infor by admin
router.get('/customer/:id', checkAdmin, userControllers.getDetailUser)
router.get('/mentor/:id', checkAdmin, userControllers.getDetailUser)
router.get('/staff/:id', checkAdmin, userControllers.getDetailUser)
router.get('/admin/:id', checkAdmin, userControllers.getDetailUser)
//update by admin
router.post('/customer/update', checkAdmin, userControllers.updateUser)
router.post('/mentor/update', checkAdmin, userControllers.updateUser)
router.post('/staff/update', checkAdmin, userControllers.updateUser)
router.post('/admin/update', checkAdmin, userControllers.updateUser)
//update role
router.get('/getAll',checkStaff,userControllers.getAllUserByAdmin)
//*
router.post('/staff/updateRoleByStaff', checkStaff, userControllers.updateRoleByStaff)
router.post('/admin/updateRoleByAdmin', checkAdmin, userControllers.updateRoleByAdmin)
// generation
router.post('/login', userControllers.login)
router.post('/register', userControllers.register)
// for all user
router.get('/getInfor',checkUser,userControllers.getOwnerInfor)
router.post('/updateInfor',checkUser,userControllers.updateOwnerInfor)
export default router