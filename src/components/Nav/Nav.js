import { POSITION, CLASSLIST } from '../../common/constants.js';
import { renderNewsSection } from '../NavList/NewsList.js';

export const switchCategory = (target) => {
  if (target.classList.contains(CLASSLIST.ITEM)) {
    const category = target.id;

    renderNewsSection(POSITION.AFTERBEGIN, '', category);
  }
};

export const activateCategoryBtn = (target) => {
  if (!target.classList.contains(CLASSLIST.ITEM)) {
    return;
  }

  const catergyList = [...target.closest('ul').children];

  catergyList.map((category) => {
    if (category.classList.contains(CLASSLIST.ACTIVE)) {
      category.classList.remove(CLASSLIST.ACTIVE);
    }
  });

  if (!target.classList.contains(CLASSLIST.ACTIVE)) {
    target.classList.add(CLASSLIST.ACTIVE);
  }
};
