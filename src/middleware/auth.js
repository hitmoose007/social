const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function isAdmin(req, res, next) {
  try {
    const user = await prisma.user.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (!user.isAdmin) {
      return res.status(401).json({
        message: "You are not authorized to access this resource",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "You are not authorized to access this resource",
    });
  }
}

async function isLoggedIn(req, res, next) {
  console.log(req.headers);
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "Unauthorized" });

  try {
    const token = header.split(" ")[1]; // Bearer <token>
    const decoded = jwt.verify(token, "privateKey");
    console.log(decoded.email);

    const user = await prisma.user.findFirst({
      where: {
        email: decoded.email,
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;

    next();
  } 
  catch (error) {
    console.log(error)

    return res.status(400).json({ error: "Invalid token" });
  }
}

module.exports = { isLoggedIn, isAdmin };
