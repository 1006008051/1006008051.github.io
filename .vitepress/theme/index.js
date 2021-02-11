import DefaultTheme from 'vitepress/theme';
import  momo from '../../packages/index.js';
export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        app.use(momo)
    },
};
