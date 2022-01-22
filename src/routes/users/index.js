const router = require('express').Router({mergeParams: true});

router.use('/',require('./users'));

module.exports = router;