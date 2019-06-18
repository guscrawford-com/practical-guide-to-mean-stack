const GenericRepoService = require('./generic-repo-service');
/**
 * See the sample shoes in assets
 * [Shoe]-[InventoryRecord]
 */
class ShoeService extends GenericRepoService {
    constructor(
        /* pass dependencies here... */
    ) {
        super();
        Array.prototype.push.apply(
            this.data,
            require('../assets/data/shoes').map(
                (shoe, index)=>{
                    shoe.sku = index.toString(16);
                    return shoe;
                }
            )
        );
    }
}
module.exports = ShoeService;