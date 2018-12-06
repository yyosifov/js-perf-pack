async function batchPromiseAll(items, callbackFn, groupSize = 100) {
    const length = (items || []).length;
    const chunks = length / groupSize;
    for (let i = 0; i < chunks; i++) {
        let chunkItems = items.splice(0, groupSize);
        await Promise.all(_.map(chunkItems, item => callbackFn(item)));
        chunkItems = [];
    }
}

exports = module.exports = {
    batchPromiseAll
}