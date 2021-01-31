let entry = {};
let dosc = [];
const path = require('path');
const fs = require('fs');
const guidePath = path.resolve(__dirname, '../guide');
const files = fs.readdirSync(guidePath);
files.forEach(key => {
    if (!['log', 'README.md'].includes(key)) entry[key] = path.join(guidePath, key);
    if(!['index.js', 'README.md'].includes(key)) dosc.push(key);
});
dosc = dosc.sort().map(n => `/guide/${n}/`);
exports.dosc = dosc;
exports.entry = entry;
