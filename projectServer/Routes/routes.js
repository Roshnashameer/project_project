const express=require('express')

// router object
const router=new express.Router()
const user=require('../controllers/userControle')
const upload = require('../middlewares/multerMiddleware')
const { jwtMiddleware } = require('../middlewares/jwtmiddleware')


// signup
router.post('/user/register',user.register)

// login 
router.post('/user/login',user.login)

// update profile
router.put('/user/update-profile/:_id',jwtMiddleware,upload.single('profile'),user.editProfile)

// add new project
router.post('/user/add-project',jwtMiddleware,upload.single('projectImage'),user.addProject)



module.exports=router