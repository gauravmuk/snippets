/**
 * Compress object keys - useful where we have length restriction like in web cookies
 * [USAGE] - compressObject({a1: 1, a: 2});
 *
 * @param  {Object} inputObj
 * @return {Object} which contains comprresed obj and the mapper object
 */
function compressObj(inputObj) {
    if (Object.prototype.toString.call(inputObj) !== '[object Object]') {
        console.warn('Please provide only an object');
        return;
    }
    var compressObj = {};
    var mapperObj = {};
    var obj = {};
    // Sorting is necessary to handle cases like:
    // var obj = { a1: 1, a: 2 };
    // If we don't sort on the keys, then we would not be able to decide the key-name for the second key
    // and thus will prevent the below logic from getting into endless recursion
    Object.keys(inputObj).sort().forEach(function(key) {
      obj[key] = inputObj[key];
    });

    for (var key in obj) {
        var index = 1;
        var isOptimized = false;

        while (!isOptimized) {
            if (!compressObj[key.substr(0, index)]) {
                var value = typeof obj[key] === 'boolean' ? +obj[key] : obj[key];

                compressObj[key.substr(0, index)] = value;
                mapperObj[key.substr(0, index)] = key;
                index = 1;
                isOptimized = true;
            } else {
                index++;
                isOptimized = false;
            }
        }
    }

    return {
        mapperObj: mapperObj,
        compressObj: compressObj
    };
}