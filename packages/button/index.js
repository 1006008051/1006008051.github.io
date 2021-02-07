import MoButton from './button.vue';
/* istanbul ignore next */
MoButton.install = (app) => {
  app.component(MoButton.name, MoButton);
};

export default MoButton;