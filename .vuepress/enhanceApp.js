const momo = require('../packages/index.js');
export default ({Vue}) => {
    Vue = require('vue@next');
    const {createApp} = Vue;
    const app = createApp();
    app.use(momo);
}