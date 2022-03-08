import { getNews } from '../common/api/news.js';
import { ALTERNATIVE, POSITION } from '../common/constants.js';
import { $ } from '../common/utils.js';
import { Component } from '../core/Component.js';
import { store, setActiveCategory } from '../store.js';

export default class NavList extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const articles = store.getState().activeCategory;

    if (articles === 'all') return null;

    return `
              <article class="news-list">
                ${articles
                  .map((article) => {
                    let { url, urlToImage, title, description } = article;
                    if (!urlToImage)
                      urlToImage = '../../img/img-not-found.jpeg';
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

  async handleCategoryNews() {
    const { categoryName } = store.getState();
    const articles = await getNews(categoryName);

    store.dispatch(setActiveCategory(articles));
  }

  observeIntersection(categoryName) {
    const observer = new IntersectionObserver((entries) => {
      // 스크롤 시 로딩되는 페이지는 2페이지 부터 시작
      const page = Math.floor($('.news-list').children.length / 5) + 1;

      // 최대 로딩 가능한 페이지 수  5 로 설정
      let total = 5;

      if (page === total) {
        console.log(`최종 페이지 ${total} 페이지에 도달 하였습니다.`);
        return;
      }

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
    const scrollObserver = $('.scroll-observer');

    if (!scrollObserver) return;

    observer.observe(scrollObserver);
  }

  async mounted() {
    const { categoryName } = store.getState();

    await this.handleCategoryNews();

    // Store의 카테고리 이름 변경에 따라 해당 카테고리 렌더링
    this.observeIntersection(categoryName);
  }
}
