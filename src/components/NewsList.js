import { ALTERNATIVE } from '../common/constants.js';
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

                  if (!urlToImage) urlToImage = 'img/img-not-found.jpeg';

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

  componentDidMount() {}
}
