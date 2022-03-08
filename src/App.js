import { $ } from './common/utils.js';
import { Nav } from './components/Nav.js';
import NavList from './components/NewsList.js';
import { Component } from './core/Component.js';

export class App extends Component {
  template() {
    return `
      <div class="category-list"></div>
      <div class="news-list-container"></div>
   `;
  }

  setEvent() {
    new Nav($('.category-list'));
    new NavList($('.news-list-container'));
  }
}
