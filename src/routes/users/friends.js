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
router.post("/friend_list", isLoggedIn, getFriends); //adds a person to the friends list
router.get("/friend_list", isLoggedIn, getFriends);

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

        console.log()
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
    //
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
        let errorM= "Cannot find user";
        res.json({errorM});
        }
        else
        {
            res.json({
                error:error.message
            })
        }
    }
    const addUser = await prisma.friend.create({//thinking up a query for this. Should work as follows:
        // Friends as Fr, Users as Us. Insert into I where userId=Us.Id
        where: {
            userId: req.user.id,
        },
        include:{
            data:{
                id:req.user.id
            }
        }
    });

}
module.exports = router;