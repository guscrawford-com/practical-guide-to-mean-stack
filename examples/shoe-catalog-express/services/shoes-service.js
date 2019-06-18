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

    async upsert(item, filter) {
        let reqFields = {
            year:null,
            make:null,
            model:null,
            trim:null,
            ... item
        };
        if (!(
            reqFields.year &&
            reqFields.make &&
            reqFields.model &&
            reqFields.trim
        )) throw new Error(`missing fields: ${Object.keys(reqFields).filter(f=>!reqFields[f]).join(', ')}`);
        if (!item.sku) {
            item.sku = this.data.length.toString();
        }
        return super.upsert(item, filter);
    }
}
module.exports = ShoeService;