const router = require('express').Router({mergeParams: true});

router.use('/',require('./users'));
router.use('/profile',require('./profile'));
router.use('/friends',require('./friends'));
router.use("/:userId/posts", require("./posts"));

module.exports = router;