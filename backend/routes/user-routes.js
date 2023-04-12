const express = require('express')
const router = express.Router()
const { getAllUser, signup, login,logout } = require("../controllers/user-controller")


router.get("/",getAllUser)
router.post("/register",signup)
router.post("/login",login)

module.exports = router
