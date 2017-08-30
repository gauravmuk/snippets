var compressObj = {};
var mapperObj = {};
var obj = {};

for (var keys in obj) {
    var index = 1;
    var isOptimized = false;

    while (!isOptimized) {
        if (!compressObj[keys.substr(0, index)]) {
            var value = typeof obj[keys] === 'boolean' ? +obj[keys] : obj[keys];
            compressObj[keys.substr(0, index)] = value;
            mapperObj[keys.substr(0, index)] = keys;
            index = 1;
            isOptimized = true;
        } else {
            index++;
            isOptimized = false;
        }
    }
}
