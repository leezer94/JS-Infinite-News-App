import { getNews } from '../common/api/news.js';
import { ALTERNATIVE, POSITION } from '../common/constants.js';
import { $ } from '../common/utils.js';
import Component from './core/Component.js';

export default class NavList extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    let { defaultCategory, activeCategory } = this.props;
    let articles;

    if (!activeCategory) {
      articles = defaultCategory;
    } else {
      articles = activeCategory;
    }

    return `
            <article class="news-list">
              ${articles
                .map((article) => {
                  let { url, urlToImage, title, description } = article;

                  if (!urlToImage) urlToImage = '../../img/img-not-found.jpeg';

                  if (!description) description = ALTERNATIVE.DESCRIPTION;

                  return `<section class="news-item">
                  <div class="thumbnail">
                    <a href="${url}" target="_blank" rel="noopener noreferrer">
                      <img src="${urlToImage}" alt="thumbnail" />
                    </a>
                  </div>
                  <div class="contents">
                    <h2>
                      <a href="${url}" target="_blank" rel="noopener noreferrer">
                        ${title}
                      </a>
                    </h2>
                    <p>${description}</p>
                  </div>
                </section>`;
                })
                .join('')}
            </article>
          <div class="scroll-observer">
          <img src="img/ball-triangle.svg" alt="Loading..." />
          </div>
    `;
  }

  componentDidMount() {
    const { categoryName } = this.props;

    this.observeIntersection(categoryName);
  }

  observeIntersection(categoryName) {
    const observer = new IntersectionObserver((entries) => {
      const page = Math.floor($('.news-list').children.length / 5) + 1;

      // 최대 로딩 가능한 페이지 수  5 로 설정
      let total = 5;

      if (page === total) return;

      entries.forEach(async (entry) => {
        if (!entry.isIntersecting) return;

        const articles = await getNews(categoryName, page);

        articles.map((article) => {
          let { url, urlToImage, title, description } = article;

          if (!urlToImage) urlToImage = 'img/img-not-found.jpeg';

          if (!description) description = ALTERNATIVE.DESCRIPTION;

          this.loadMoreNews(
            $('.news-list'),
            POSITION.BEFOREEND,
            this.newsTemplate(url, urlToImage, title, description)
          );
        });
      });
    });

    observer.observe($('.scroll-observer'));
  }
}
