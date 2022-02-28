import { CATEGORIES } from '../common/constants.js';
import { navTemplate } from './Nav/NavTemplate.js';
import { newsListSectionTemplate } from './NavList/newsListTemplate.js';
import { render } from '../common/utils.js';
import { renderNewsSection } from './NavList/NewsList.js';
import { switchCategory, activateCategoryBtn } from './Nav/Nav.js';

export const renderNewsPage = (target) => {
  render(target, 'afterbegin', navTemplate(CATEGORIES));
  render(target, 'beforeend', newsListSectionTemplate());

  renderNewsSection();
};

// const handleScroll = () => {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//   let currentPage = 1;
//   let total = 10;
//   const end = 100;

//   if (total === end) {
//     window.removeEventListener('scroll', handleScroll);
//     return;
//   }

//   if (scrollTop + clientHeight >= scrollHeight - 5) {
//     currentPage++;
//     total += 10;

//     return;
//   }
// };

export const bindEventListeners = (rootElement) => {
  rootElement.addEventListener('click', ({ target }) => {
    switchCategory(target);
    activateCategoryBtn(target);
  });

  // window.addEventListener('scroll', () => {});
};
