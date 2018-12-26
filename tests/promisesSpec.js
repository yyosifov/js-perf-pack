const { batchPromiseAll } = require('../lib/promises');
const _ = require('lodash');
const expect = require('expect');

describe('promises', () => {
    it('works with undefined and null', async () => {
        await batchPromiseAll(null, () => {});
        await batchPromiseAll(undefined, () => {});
    });

    [
        1, 2, 3, 4, 5, 111, 333, 500, 1000, 2000
    ].forEach(async (itemsCount) => {
        it(`executes ${itemsCount} promises and doesn't modify initial items`, async () => {
            const allItems = [];
            const promiseFn = async function (x) {
                return new Promise(resolve => {
                    allItems.push(x);
                    resolve(x);
                });
            }
            const items = _.range(0, itemsCount, 1);

            await batchPromiseAll(items, (item) => {
                return promiseFn(item);
            });

            expect(items.length).toBe(itemsCount);
            expect(allItems.length).toBe(itemsCount);

            _.each(_.range(0, itemsCount, 1), x => {
                expect(_.includes(items, x)).toBe(true);
                expect(_.includes(allItems, x)).toBe(true);
            });
        });
    });
});