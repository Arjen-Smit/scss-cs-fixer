var glob = require('glob');
var config = require('./src/config.js')();
var list = config.getEnabledOperatorList();

glob("fixture/scss/**/*.scss", function (err, files) {
    console.log(files, err);
})