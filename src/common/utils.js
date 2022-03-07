export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => document.querySelectorAll(selector);

export const addClassName = (target, className) => {
  target.classList.add(className);
};

export const removeClassName = (target, className) => {
  target.classList.remove(className);
};
