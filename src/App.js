import Component from './components/core/Component.js';
import { getNews } from './common/api/news.js';
import { ALTERNATIVE } from './common/constants.js';
import { $ } from './common/utils.js';
import Nav from './components/Nav.js';
import NavList from './components/NewsList.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  async initialState() {
    this.setState({
      defaultCategory: await getNews('all'),
      activeCategory: null,
      categoryName: 'all',
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

    const observer = new IntersectionObserver((entries) => {
      const page = Math.floor($('.news-list').children.length / 5) + 1;

      // 최대 로딩 가능한 페이지 수  5 로 설정
      let total = 5;

      if (page === total) return;

      entries.forEach(async (entry) => {
        if (!entry.isIntersecting) return;

        const articles = await getNews(this.state.categoryName, page);

        articles.map((article) => {
          let { url, urlToImage, title, description } = article;

          if (!urlToImage) urlToImage = 'img/img-not-found.jpeg';

          if (!description) description = ALTERNATIVE.DESCRIPTION;

          this.loadMoreNews(
            $('.news-list'),
            'beforeend',
            this.newsTemplate(url, urlToImage, title, description)
          );
        });
      });
    });

    observer.observe($('.scroll-observer'));
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
