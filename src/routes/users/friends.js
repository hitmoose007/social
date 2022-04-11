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
router.delete("/friend_list/:friendId/remove", isLoggedIn, removeFriend); //removes a friend id from table
router.post("/:id/addFriend", isLoggedIn, addFriend); 
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
        //function to remove a friend
    try {
        const friend = await prisma.friend.delete({
            where: {
                userId_friendId: {
                    userId: req.user.id,
                    friendId: req.params.friendId
                }
            }
        });
        res.json(friend);
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message,
        });

    }
}

async function addFriend(req,res){
    try{
        const friend = await prisma.friend.create({
            data:{
                userId: req.user.id,
                friendId: req.params.id
            }
        });
        res.json(friend);
    }catch(error){
        res.json({
            error: error.message
        });
    }
}
    

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

module.exports = router;