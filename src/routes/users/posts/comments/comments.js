const express= require("express");
const router = express.Router({
    mergeParams: true
});
const {
    PrismaClient
} = require("@prisma/client");
const prisma = new PrismaClient();
const {
    isLoggedIn,
    isAdmin
} = require("../../../../middleware/auth");

//router for creating a comment under a pos


module.exports=router;