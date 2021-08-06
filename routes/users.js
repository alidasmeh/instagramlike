var express = require('express');
var router = express.Router();

router.use(require('../middlewares/user_is_not_login'));

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
