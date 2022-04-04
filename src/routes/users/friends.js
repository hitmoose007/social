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


router.get("/friend_list", isLoggedIn, getFriends);
router.delete("/friend_list/remove/:id", isLoggedIn, removeFriend);
router.get("/friend_list", isLoggedIn, getFriends);
router.get("/friend_list", isLoggedIn, getFriends);

async function getFriends(req, res) {
    try {
        const user = await prisma.user.findMany({
            where: {
                friend: req.user.friend
            }
        })
        res.json(user);
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
}

async function removeFriend(req, res) {
    const friend = await prisma.user.findFirst({
        where: {
            friendId: req.user.friend
        }
    });
    if (friend != null) {
        try {
            const deleteFriend = await prisma.delete({
                where: {
                    friendId: req.user.friend
                }
            });
            res.json({
                deleteFriend,
            })
        } catch (error) {
            res.json({
            error:error.message
            })
        }
    }
}

module.exports=router;