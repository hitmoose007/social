const router = require('express').Router({mergeParams: true});

router.use('/',require('./post'));
router.use('/comments',require('./comments'));
module.exports = router;