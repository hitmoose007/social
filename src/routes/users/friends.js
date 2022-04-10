const express = require("express");
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
} = require("../../middleware/auth");


router.get("/friend_list", isLoggedIn, getFriends); //gets friend list
router.delete("/friend_list/remove/:friendId", isLoggedIn, removeFriend); //removes a friend id from table
router.post("/addFriend", isLoggedIn, getFriends); 
router.get("/friend_list/:friendId", isLoggedIn, viewFriendProfile);
router.get("/friend_list/:friendId/posts", isLoggedIn, viewFriendPosts);

//function for getting friends list
async function getFriends(req, res) {
    try {
        const friends = await prisma.friend.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                friend: {
                    select: {
                        name: true
                    }
                }
            }
        });
        console.log();
        res.json(friends);
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
}

//function for removing a friend
async function removeFriend(req, res) {
    const friends = await prisma.friend.findFirst({
        where: {
            userId: req.user.id,
            friendId: req.friend.friendId
        }
    });
    if (friends != null) {
        try {
            const deleteFriend = await prisma.friend.delete({
                where: {
                    friendId: req.param.friendId
                }
            });
            res.json({
                deleteFriend,
            });
        } catch (error) {
            res.json({
                error: error.message
            });
        }
    } else {
        return res.status(400).json({
            error: "No friend with that ID exists"
        });
    }
}

async function addFriend(req, res) {
    try {
        const user = await prisma.user.findFirst({//check if the user being added exists
            where: {
                id:req.user.id
            }
        });
    }
    catch(error){
        if(user==null){
        const errorM= "Cannot find user";
        res.json({errorM});
        }
        else
        {
            res.json({
                error:error.message
            });
        }
        return;
    }
    const addUser = await prisma.friend.create({// function for adding friend
        data:{
            userId:req.user.id,
            friendId:req.friend.friendId
        },
        include:{
            friend:{
                select:{
                    name:true
                }
            }
        }
        
    });
    //function to fetch profile of a friend of a user
async function viewFriendProfile(req,res){
    try{
        const friendProfile = await prisma.user.findOne({
            where:{
                id:req.friend.friendId
            },
            select:{
                name:true,
                email:true,
                profilePicture:true,
                bio:true,
                location:true,
                website:true,
                dateOfBirth:true
            }
        });
        res.json({friendProfile});
    }
    catch(error){
        res.json({
            error:error.message
        });
    }
}

async function viewFriendPosts(req,res){
    try{
        const friendPosts = await prisma.post.findMany({
            where:{
                userId:req.friend.friendId
            },
            orderBy:{
                createdAt:"desc"
            }
        });
        res.json({friendPosts});
    }
    catch(error){
        res.json({
            error:error.message
        });
    }
}

}
module.exports = router;