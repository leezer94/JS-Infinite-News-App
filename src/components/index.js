import { CATEGORIES, POSITION } from '../common/constants.js';
import { navTemplate } from './Nav/NavTemplate.js';
import { newsListSectionTemplate } from './NavList/newsListTemplate.js';
import { render } from '../common/utils.js';
import { loadMoreNews, renderNewsSection } from './NavList/NewsList.js';
import { switchCategory, activateCategoryBtn } from './Nav/Nav.js';
import { $ } from '../common/DOM.js';

export const renderNewsPage = (target) => {
  render(target, POSITION.AFTERBEGIN, navTemplate(CATEGORIES));
  render(target, POSITION.BEFOREEND, newsListSectionTemplate());

  renderNewsSection(POSITION.AFTERBEGIN);
};

const observer = new IntersectionObserver((entries) => {
  const categoryList = [...$('.category-list > ul').children];
  const newsList = $('.news-list');

  let page =
    Math.abs(document.getElementsByClassName('news-item').length / 5) + 1;

  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    loadMoreNews(categoryList, newsList, page);
  });
});

export const bindEventListeners = (rootElement) => {
  rootElement.addEventListener('click', ({ target }) => {
    switchCategory(target);
    activateCategoryBtn(target);
  });

  observer.observe($('.scroll-observer'));
};
