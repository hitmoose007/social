router = require('express').Router({ mergeParams: true });
const { PrismaClient } = require("@prisma/client");
const {comparePassword, hashPassword} = require('../../utils/hash');



router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

async function login(req, res){
    
}