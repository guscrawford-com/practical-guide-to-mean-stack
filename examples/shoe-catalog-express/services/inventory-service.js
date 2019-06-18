const GenericRepoService = require('./generic-repo-service');
/**
 * [InventoryRecord]-[Shoe]
 */
class InventoryService extends GenericRepoService {
    constructor(
        /* pass dependencies here... */
        shoesService
    ) {
        super();
        if (!shoesService) shoesService = new (require('./shoes-service'))();
        this.shoesService = shoesService;
        this.data = [];
    }
    insertMockInventory() {
        let inventory = this.data;
        this.shoesService.all().forEach(
            shoe=>{
                inventory.push(
                    {
                        shoe,
                        count: Math.floor(random(10,250)),
                        updated: new Date()
                    }
                );
            }
        );
        return inventory;
    }
}
module.exports = InventoryService;
function random(min, max) { return Math.random() * (+max - +min) + +min };