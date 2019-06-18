const inventoryService = new (require('../services/inventory-service'))();
var express = require('express');
var router = express.Router();
router.get('/', async function(req, res, next) {
    let result = await inventoryService.findAny(req.query);
    return res.json(result);
});
module.exports = router;
