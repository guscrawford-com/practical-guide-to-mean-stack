const invService = new (require('../services/inventory-service'))();
invService.insertMockInventory();
module.exports = function (request, response) {
    switch (request.method.toLowerCase()) {
        case 'get':
            return invService.findAny(request.query);
        default:
            let notFound = new Error('Not found');
            notFound.statusCode = 404;
            throw notFound;
    }
}