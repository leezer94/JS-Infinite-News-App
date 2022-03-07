import Component from './core/Component.js';
import { CATEGORIES } from '../common/constants.js';

export default class Nav extends Component {
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
  componentDidMount() {
    this.$target.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('category-item')) return;
      this.switchCategory(target);
      // this.addActive(target);
    });
  }

  switchCategory(target) {
    const { onChangeCategory } = this.props;

    onChangeCategory(target.id);
  }

  // addActive(target) {
  //   const categorylist = [...target.closest('ul').children];

  //   categorylist.map((category) => {
  //     if (category.classList.contains('active')) {
  //       removeClassName(category, 'active');
  //     } else {
  //       addClassName(target, 'active');
  //     }
  //   });
  // }
}
