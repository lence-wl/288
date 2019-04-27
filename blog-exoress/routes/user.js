var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/post', function(req, res, next) {
const { username , password } = res.body
    res.json({
        error: 0,
        data: { username , password }
    })
});

module.exports = router;
