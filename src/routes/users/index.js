const router = require('express').Router({mergeParams: true});

router.use('/',require('./users'));
router.use('/',require('./profile'));

module.exports = router;