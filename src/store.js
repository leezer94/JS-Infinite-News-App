import { createStore } from './core/Store.js';

const initState = {
  activeCategory: 'all',
  categoryName: 'all',
};

export const ACTIVE_CATEGORY = 'activeCategory';
export const CATEGORY_NAME = 'categoryName';

export const setActiveCategory = (payload) => ({
  type: ACTIVE_CATEGORY,
  payload,
});
export const setCategoryName = (payload) => ({ type: CATEGORY_NAME, payload });

export const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };
    case CATEGORY_NAME:
      return { ...state, categoryName: action.payload };
    default:
      return state;
  }
});
