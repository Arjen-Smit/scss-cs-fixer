var config = require('./src/config.js')();
var list = config.getEnabledOperatorList();

console.log(list);

console.log(config.getOperatorSettings('StringQuotes'));
