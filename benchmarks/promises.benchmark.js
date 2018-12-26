const _ = require('lodash');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getMemoryIntensivePromise() {
    return new Promise(resolve => {
        const items = [];
        _.each(_.range(0, 1000, 1), number => {
            items.push({
                number,
                numberString: number.toString()
            })
        })

        sleep(100).then(() => {
            resolve(items);
        });
    });
}

async function testPromiseAllMemoryIntensive() {
    const testItemsCount = 1;
    const testItems = _.range(0, testItemsCount, 1);

    let allItems = [];
    await Promise.all(_.map(testItems, async (ti) => {
        const items = await getMemoryIntensivePromise(ti);
        allItems = [...allItems, ...items];
    }));

    console.log(`allItems length = ${allItems.length}`);
}

(async function() {
    await testPromiseAllMemoryIntensive()
})();