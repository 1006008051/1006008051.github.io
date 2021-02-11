import {default as MoAvar} from './avar'; export {MoAvar};import {default as MoButton} from './button'; export {MoButton};
const components =[MoAvar,MoButton];
const install = function(app) {
    components.forEach(component => {
      app.use(component);
    });
    return app;
  };
export default { install };
