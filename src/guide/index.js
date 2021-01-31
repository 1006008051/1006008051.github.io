let components = []; // 普通组件
let options = []; // 方法组件
let files = require.context('./', true, /index.js$/);
files.keys().forEach(key => { 
    if(key == './index.js') return;   
    let component = files(key).default;
    typeof component === 'function' ? options.push(component) : components.push(component)
    exports[component.name] = component;
});

const install = Vue => {
    components.forEach(component => {
        Vue.component(component.name, component);
    })
    options.forEach(option => {
        Vue.prototype[`$${option.name.toLowerCase()}`] = option;
    })
    return components;
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
exports.install = install;
