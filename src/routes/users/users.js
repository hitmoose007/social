const express = require("express");
const router = express.Router({mergeParams: true});

router.get("/", getAllUsers);

async function getAllUsers(req, res){

    const users = {"name": "John"};
    res.json({users});
    
}

module.exports = router;