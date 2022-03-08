import { Component } from '../core/Component.js';
import { CATEGORIES } from '../common/constants.js';
import { store, setCategoryName } from '../store.js';
export class Nav extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
      <ul>
         <li id="all" class="category-item active">${CATEGORIES.GENERAL.KR}</li>
         <li id="business" class="category-item">${CATEGORIES.BUSINESS.KR}</li>
         <li id="entertainment" class="category-item">${CATEGORIES.ENTERTAINMENT.KR}</li>
         <li id="health" class="category-item">${CATEGORIES.HEALTH.KR}</li>
         <li id="science" class="category-item">${CATEGORIES.SCIENCE.KR}</li>
         <li id="sports" class="category-item">${CATEGORIES.SPORTS.KR}</li>
         <li id="technology" class="category-item">${CATEGORIES.TECH.KR}</li>
      </ul>
  `;
  }

  setEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('category-item')) return;

      this.handleActiveCategory(target);
    });
  }

  handleActiveCategory(target) {
    const categoryList = [...target.closest('ul').children];

    categoryList.map((category) => {
      if (category.classList.contains('active')) {
        category.classList.remove('active');
      }

      target.classList.add('active');
    });

    // store 에 현재 카테고리 저장
    store.dispatch(setCategoryName(target.id));
  }
}
