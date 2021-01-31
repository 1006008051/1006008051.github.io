const isProd = process.env.NODE_ENV === 'production';
let momo;
if (isProd) {
    momo = require('../../lib/index.js');
    require('../../lib/index.css')
} else {
    momo = require('../guide');
}
export default ({
    Vue
}) => {
    Vue.use(momo);
}