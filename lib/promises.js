const _ = require('lodash');

async function batchPromiseAll(items, callbackFn, groupSize = 100) {
    const chunks = _.chunk(items, groupSize);
    for (let chunkItems of chunks) {
        await Promise.all(_.map(chunkItems, item => callbackFn(item)));
    }
}

exports = module.exports = {
    batchPromiseAll
}