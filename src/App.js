import { $ } from './common/DOM.js';
import { bindEventListeners, renderNewsPage } from './components/index.js';

const initApp = () => {
  const $root = $('#root');

  window.addEventListener('DOMContentLoaded', renderNewsPage($root));
  bindEventListeners($root);
};

initApp();
