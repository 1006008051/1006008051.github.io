let components = []; // 普通组件
let options = []; // 方法组件
let files = require.context('./', true, /index\.js$/);
files.keys().forEach(key => {
    let component = files(key).default;
    if (!component) return;
    typeof component === 'function' ? options.push(component) : components.push(component)
    exports[component.name] = component;
});

const install = app => {
    components.forEach(component => {
        app.component(component.name, component);
    })
    options.forEach(option => {
        app.prototype[`$${option.name.toLowerCase()}`] = option;
    })
    return components;
}
if (typeof window !== 'undefined' && window.app) {
    install(window.app)
}
exports.install = install;
