import MoButton from './button.vue';

/* istanbul ignore next */
MoButton.install = (Vue) => {
  Vue.component(MoButton.name, MoButton);
};

export default MoButton;