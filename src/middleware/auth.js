const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

 async function isLoggedIn(req, res, next)  {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ error: "Unauthorized" });
    
    try {
        const token = header.split(" ")[1]; // Bearer <token>
        const decoded = jwt.verify(token, "privateKey");
        const user = await prisma.user.findFirst({
        where: {
            email: decoded.email,
        },
        });
        if(!user){
            return res.status(401).json({ error: "Unauthorized" });
        }
    } catch (error) {
        return res.status(400).json({ error: "Invalid token" });
    }
    next();

}

module.exports = { isLoggedIn };
