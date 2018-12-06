const _ = require('lodash');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function memoryIntensivePromise() {
    return new Promise(resolve => {
        const items = [];
        _.each(_.range(0, 1000, 1), number => {
            items.push({
                number,
                numberString: number.toString()
            })
        })

        await sleep(100);

        resolve();
    });
}

/*
async function testPromiseAll() {
}
*/