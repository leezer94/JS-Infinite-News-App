import { CATEGORIES, ALTERNATIVE } from '../../common/constants.js';
import { $ } from '../../common/DOM.js';
import { render } from '../../common/utils.js';
import { newsArticleTemplate } from './newsListTemplate.js';

export const renderNewsSection = async (category) => {
  const articles = [
    ...(await getNewsData(category ? category : CATEGORIES.BUSINESS.EN)),
  ];
  const newsList = $('.news-list');

  newsList.innerHTML = '';

  articles.map((article) => {
    renderArticles(newsList, article);
  });
};

const renderArticles = (target, { url, urlToImage, title, description }) => {
  if (!urlToImage) {
    urlToImage = ALTERNATIVE.IMG;
  }

  if (!description) {
    description = ALTERNATIVE.DESCRIPTION;
  }
  render(
    target,
    'afterbegin',
    newsArticleTemplate(url, urlToImage, title, description)
  );
};

export const getNewsData = async (category) => {
  let index = 1;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr&category=${
        category === 'all' ? 'general' : category
      }&pageSize=${index}&apiKey=d4d4acef12374e57b8c24c1b0aa1d634`
    );
    const articles = response.data.articles;

    return articles;
  } catch (error) {
    console.error(error);
  }
};
