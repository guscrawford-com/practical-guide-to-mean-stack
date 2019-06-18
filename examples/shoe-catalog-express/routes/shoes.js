const shoeService = new (require('../services/shoes-service'))();
var express = require('express');
var router = express.Router();

/**
 * Map URI paths and verbs to request handlers
 */
router.get('/', async function(req, res, next) {
    let result = await shoeService.findAny(req.query);
    return res.json(result);
});
/**
 * Use a path "parameter"
 */
router.get('/:sku', async function(req, res, next) {
    let result = await shoeService.findAny({...req.query, sku:req.params.sku});
    return res.json(result);
});

/**
 * Map several verbs to the "general" write routine
 */
router.post('/', generalInsertionHandler);
router.put('/', generalInsertionHandler);
router.patch('/', generalInsertionHandler);

async function generalInsertionHandler(req, res, next) {
    let result;
    try {
        result = await shoeService.upsert(req.body, req.query);
    }
    catch (problem) {
        next(problem)
    }
    return res.json(result);
}
module.exports = router;
