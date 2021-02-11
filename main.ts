/*
 * 1、读取style下所有的样式，并导入到index.less
 * 2、导出所有的入口文件, 并写入到packages下的index.js
 * 3、导出所有的文档信息
 */
const { openSync, readdirSync, writeSync, existsSync } = require('fs');
const { resolve, join } = require('path');
const packPath = resolve(__dirname, 'packages'); // 组件库路径
const stylePath = resolve(__dirname, 'style'); // 样式库路径
// webpack打包的入口文件
let entry = {};
// 导出组件的code
let packStr = '';
//默认导入主题样式
let styStr = `@import './theme.less';`;
// 文档的数组
let docs = [
    {
        text: '开发指南',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    },
    {
        text: '基础组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        text: '表单组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        text: '反馈组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        text: '展示组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        text: '导航组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        text: '业务组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        text: '其他',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }
];
/**读取所有的组件库**/
let filesName = readdirSync(packPath);
filesName.forEach((key) => {
    if (key.includes('index')) return;
    if (existsSync(join(packPath, key, 'index.js'))) {
        let keyArr = key.split('');
        let entryKey = `Mo${keyArr.shift().toUpperCase()}${keyArr}`.replace(/,/g, '');
        entry[entryKey] = join(packPath, key); // 入口文件追加
        packStr += `import {default as ${entryKey}} from './${key}'; export {${entryKey}};`
    }
    // 样式处理
    if (existsSync(join(__dirname, '../style', `${key}.less`))) {
        styStr += `@import './${key}.less';` //less样式拼接   
    }
    // 文档处理
    let docsPath = join(packPath, key, 'docsInfo.js');
    if (existsSync(docsPath)) {
        let docsInfo = require(docsPath);
        let groupId = docsInfo.groupId || 0;
        let text = docsInfo.text || key;
        let link = `/packages/${key}/`;
        docs[groupId].children.push({
            key,
            text,
            link
        });
    }
});
// 写入样式
const fd = openSync(join(stylePath, 'index.less'), 'w');
writeSync(fd, styStr, 0, 'utf8');

// 组件库处理
let components = Object.keys(entry);
packStr += `
const components =[${components}];
const install = function(app) {
    components.forEach(component => {
      app.use(component);
    });
    return app;
  };
export default { install };
`
// 写入组件库的所有导出
const wd = openSync(join(packPath, 'index.js'), 'w');
writeSync(wd, packStr, 0, 'utf8');
entry.index =  join(__dirname, 'packages');
exports.entry = entry;

// 导出文档
docs = docs.filter(n => {
    if (n.children.length) {
        n.children = n.children.sort((a, b) => a.key - b.key)
        return true;
    }
    return false;
});
docs[0].children.unshift({
    title: '介绍',
    path: '/'
});
exports.docs = docs;