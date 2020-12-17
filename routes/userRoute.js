const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    registerUser,
    loginUser,
    getAlluser,
    EditProfile,
    deleteUser,
} = require("../controller/apiController/userApiController");

//route to user register
router.post("/user/register", registerUser);
//route to user login
router.post("/user/login", loginUser);

//route to get all user list
router.get("/getalluser", getAlluser);

//route to edit user details
router.post("/editProfile/:id", EditProfile);

//delet user
router.post("/deletProfile/:id", deleteUser);

module.exports = router;
