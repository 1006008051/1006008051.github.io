const path = require('path');
const {docs} = require('../main.ts');
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
    dest: path.resolve(__dirname, '../docs'), //打包路径
    evergreen: true, //不兼容es5,打包体积更小
    plugins: ['@vuepress/back-to-top'], //点击返回顶部
  //  extraWatchFiles: [path.resolve(__dirname, '../guide')], //需要额外监听的文件
    chainWebpack: (config) => {
        // 设置样式别称
        config.resolve.alias
            .set('@style', path.resolve(__dirname, '../style'));
        config.module.rule('ignore-ts-file')
            .test(/\.ts$/)
            .use('ts-loader')
            .loader('ts-loader')
    },
    themeConfig: {
        logo: '/logo.png',
        smoothScroll: true,
        lastUpdated: true, //最后更新时间
        nav: [
            { text: 'GitHub', link: 'https://github.com/1006008051/momo-ui.git' },
        ],
        sidebar: docs
    }
};