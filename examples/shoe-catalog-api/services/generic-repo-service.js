/**
 * A general service we can use to wrap collections of stuff
 */
class GenericRepoService {
    constructor(
        /* injections */
    ) {
        this.data = [];
    }

    /**
     * Find all data
     */
    async all() {
        return this.data;
    }

    /**
     * Find data with *any* partial matches on the `filter` parameter
     * @param {object} filter an object with properties to match shoes on
     */
    async findAny(filter/* an object */) {
        if (!Object.keys(filter).length)
            return this.all();
        return this.data.filter(
            item=>anyNestedPropertyMatches(item, filter)
        );
    }

    async findOne(filter) {
        let many = await this.findAny(filter);
        return many[0];
    }

    /**
     * Update many items matching the filter with the data stored in the item
     * @param {*} item New item to add or update a matching with
     * @param {*} filter Filter with which to find any 
     */
    async upsert(item, filter) {
        let updatingIndex;
        let updated = {
            original:[],
            current:[],
            indices:{},
            added:[]
        };
        do {
            updatingIndex = this.data.findIndex(item=>anyNestedPropertyMatches(item, filter));
            let updatedObject = Object.assign(this.data[updatingIndex] || {}, item);
            if (updatingIndex !== -1 && !updated.indices[updatingIndex]) {
                updated.current.push(updatedObject);
                updated.original.push(this.data.splice(updatingIndex, 1, updatedObject));
                updated.indices[updatingIndex] = updatedObject;
            }
            else if (this.data[updatingIndex])
                updatingIndex = -1;
            else {
                updated.indices[
                    this.data.push(
                        updatedObject
                    )
                ] = updatedObject;
                updated.added.push(updatedObject);
            }
        } while(updatingIndex !== -1)
        return updated;
    }

    /**
     * Remove all data matching the filter
     * @param {*} filter 
     */
    async remove(filter) {
        let removalIndex;
        let removed = [];
        do {
            removalIndex = this.data.findIndex(item=>anyNestedPropertyMatches(item, filter));
            if (removalIndex !== -1)
                removed.push(this.data.splice(removalIndex, 1));
        } while(removalIndex !== -1)
        return {removed};
    }
}
module.exports = GenericRepoService;
anyNestedPropertyMatches = (item, filter)=>{
    for (let key in filter) {
        let unNestedKey = key.split('.');
        let typeOfItemKey = typeof item[unNestedKey[0]];
        if (
            typeOfItemKey !== 'undefined'
            && typeOfItemKey !== 'object'
        ) {
            if (
                item[unNestedKey[0]].toLocaleLowerCase().indexOf(
                    filter[unNestedKey[0]].toString().toLocaleLowerCase()
                )!==-1
            ) return true;
        }
        
        let nestedFilter = {};
        let nestedKey = unNestedKey.slice(1).join('.');
        nestedFilter[nestedKey] = filter[key];
        if (
            typeOfItemKey === 'object'
            && anyNestedPropertyMatches(item[unNestedKey[0]],nestedFilter)
        ) return true;
    }
    return false;
}