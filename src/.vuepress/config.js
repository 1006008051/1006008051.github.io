const dosc = require('./index').dosc;
const path = require('path');
module.exports = {
    // base: './',
    title: 'MOMO-UI',
    description: 'MOMO-UI',
    head: [
        ['link', {
            rel: 'icon',
            href: `/logo.png`
        }]
    ],
    dest: path.resolve(__dirname, '../../docs'),
    evergreen: true,
    plugins: ['@vuepress/back-to-top'],
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@style', path.resolve(__dirname,'../style'));
    },
    themeConfig: {
        logo: '/logo.png',
        smoothScroll: true,
        lastUpdated: true, //最后更新时间
        nav: [
            { text: '首页', link: '/' },
            { text: '组件', link: '/guide/' },
            { text: 'GitHub', link: 'https://github.com/1006008051/momo-ui.git' },
        ],
        sidebar: [
            ['/', '首页'],
            '/guide/',
            '/guide/log/',
            {
                title: '组件',
                collapsable: false,
                children: dosc
            }
        ]
    }
};