const shoeService = new (require('../services/shoes-service'))();
var express = require('express');
var router = express.Router();
router.get('/', async function(req, res, next) {
    let result = await shoeService.findAny(req.query);
    return res.json(result);
});
router.get('/sell', async function (req, res, next) {
    return res.json({
        sold:false
    })
})
module.exports = router;
