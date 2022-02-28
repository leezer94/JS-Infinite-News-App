import { renderNewsSection } from '../NavList/NewsList.js';

export const switchCategory = (target) => {
  if (target.classList.contains('category-item')) {
    const category = target.id;

    renderNewsSection(category);
  }
};

export const activateCategoryBtn = (target) => {
  if (!target.classList.contains('category-item')) {
    return;
  }

  const catergyList = [...target.closest('ul').children];

  catergyList.map((category) => {
    if (category.classList.contains('active')) {
      category.classList.remove('active');
    } else {
      target.classList.add('active');
    }
  });
};
