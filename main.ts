/*
 * 1、读取style下所有的样式，并导入到index.less
 * 2、导出所有的入口文件
 * 3、 导出所有的文档信息
 */



const { openSync, readdirSync, writeSync, existsSync } = require('fs');
const { resolve, join } = require('path');
const packPath = resolve(__dirname, 'packages'); // 组件库路径
const stylePath = resolve(__dirname, 'style'); // 样式库路径
// webpack打包的入口文件
let entry = {
    index: join(__dirname, 'packages')
};
//默认导入主题样式
let styStr = `@import './theme.less';`;
// 文档的数组

let docs = [
    {
        title: '开发指南',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    },
    {
        title: '基础组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        title: '表单组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        title: '反馈组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        title: '展示组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        title: '导航组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        title: '业务组件',
        collapsable: false,
        sidebarDepth: 0,
        children: []
    }, {
        title: '其他',
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
        entry[key] = join(packPath, key); // 入口文件追加
    }
    if (existsSync(join(__dirname, '../style', `${key}.less`))) {
        styStr += `@import './${key}.less';` //less样式拼接   
    }
    let docsPath = join(packPath, key, 'docsInfo.js');
    let groupId = 0;
    if (existsSync(docsPath)) {
        groupId = require(docsPath).groupId || groupId;
    }
    docs[groupId].children.push(key);
});
// 写入样式
const fd = openSync(join(stylePath, 'index.less'), 'w');
writeSync(fd, styStr, 0, 'utf8');
// 按首字母排序
docs = docs.filter(n => {
    if (n.children.length) {
        n.children = n.children.sort().map(n => `/packages/${n}/`);
        return true;
    }
    return false;
});
docs[0].children.unshift({
    title: '介绍',
    path: '/'
});
exports.docs = docs;
exports.entry = entry;