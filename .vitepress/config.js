const { docs } = require('../main.ts');
module.exports = {
  title: 'momo-ui', // 设置网站标题
  description: 'vue3组件库',
  outDir: './docs', // 输出目录
  themeConfig: {
    lastUpdated: 'Last Updated',
    // algolia搜索框
    algolia: {
      apiKey: 'c57105e511faa5558547599f120ceeba',
      indexName: 'vitepress'
    },
    // carbonAds添加广告栏
    carbonAds: {
      carbon: 'CEBDT27Y',
      custom: 'CKYD62QM',
      placement: 'vuejsorg'
    },
    // 导航
    nav: [
      { text: '源码', link: '/' },
    ],
    sidebar:docs
  }
}