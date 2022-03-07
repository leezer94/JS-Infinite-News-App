import Component from './components/core/Component.js';
import { getNews } from './common/api/news.js';
import { ALTERNATIVE, CATEGORIES, POSITION } from './common/constants.js';
import { $ } from './common/utils.js';
import Nav from './components/Nav.js';
import NavList from './components/NewsList.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  async initialState() {
    this.setState({
      defaultCategory: await getNews(CATEGORIES.GENERAL.EN),
      activeCategory: null,
      categoryName: CATEGORIES.GENERAL.EN,
    });
  }

  template() {
    return `
      <div class="category-list"></div>
      <div class="news-list-container"></div>
    `;
  }

  componentDidMount() {
    const { handleNav } = this;

    new Nav($('.category-list'), { onChangeCategory: handleNav.bind(this) });

    new NavList($('.news-list-container'), {
      defaultCategory: this.state?.defaultCategory,
      activeCategory: this.state?.activeCategory,
      categoryName: this.state?.categoryName,
    });
  }

  async handleNav(target) {
    const currentCategory = await getNews(target);

    this.setState({
      ...this.state,
      activeCategory: currentCategory,
      categoryName: target,
    });
  }
}
