const shoeService = new (require('../services/shoes-service'))();
module.exports = async function (request, response) {
    switch (request.method.toLowerCase()) {
        case 'get':
            if (request.paths[2])
                return shoeService.findOne(Object.assign(request.query,{
                    sku:request.paths[2]
                }));
            return shoeService.findAny(request.query);
        // case 'post': case 'put': case 'patch':
        //     return shoeService.upsert(request.body, request.query);
        // case 'delete':
        //         return shoeService.remove(request.query);
        // default:
        //     let notFound = new Error('Not found');
        //     notFound.statusCode = 404;
        //     throw notFound;
    }
}