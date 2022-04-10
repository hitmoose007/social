const router = require('express').Router({mergeParams: true});

router.use('/',require('./users'));
router.use('/',require('./profile'));
router.use('/',require('./friends'));

module.exports = router;