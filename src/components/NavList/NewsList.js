import {
  CATEGORIES,
  ALTERNATIVE,
  POSITION,
  CLASSLIST,
} from '../../common/constants.js';
import { $ } from '../../common/DOM.js';
import { render } from '../../common/utils.js';
import { newsArticleTemplate } from './newsListTemplate.js';

export const renderNewsSection = async (position, articles, category) => {
  if (!articles) {
    articles = [
      ...(await getNewsData(category ? category : CATEGORIES.GENERAL.EN)),
    ];
  }

  const newsList = $('.news-list');

  newsList.innerHTML = '';

  articles.map((article) => {
    renderArticles(newsList, position, article);
  });
};

export const renderArticles = (
  target,
  position,
  { url, urlToImage, title, description }
) => {
  if (!urlToImage) {
    urlToImage = 'img/img-not-found.jpeg';
  }

  if (!description) {
    description = ALTERNATIVE.DESCRIPTION;
  }
  render(
    target,
    position,
    newsArticleTemplate(url, urlToImage, title, description)
  );
};

export const loadMoreNews = (categoryList, target, page) => {
  categoryList.map(async (category) => {
    if (category.classList.contains(CLASSLIST.ACTIVE)) {
      category = category.id;

      let articles = [...(await getNewsData(category, page))];

      articles.map((article) => {
        renderArticles(target, POSITION.BEFOREEND, article);
      });
    }
  });
};

const getNewsData = async (category, page = 1) => {
  let index = 5;

  console.log(page);
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr&category=${
        category === 'all' ? CATEGORIES.GENERAL.EN : category
      }&page=${page}&pageSize=${index}&apiKey=9b2228495d834fdb93c5109f9aa4a0e6`
    );

    const articles = response.data.articles;

    return articles;
  } catch (error) {
    console.error(error.message);
  }
};
