const router = require('express').Router({mergeParams: true});

router.use('/',require('./post'));
router.use('/',require('./comments'));
module.exports = router;