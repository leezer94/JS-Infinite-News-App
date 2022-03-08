import { CATEGORIES } from '../constants.js';

export const getNews = async (currentCategory, page = 1) => {
  const API_KEY = '9b2228495d834fdb93c5109f9aa4a0e6';
  let index = 5;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr&category=${
        currentCategory === 'all' ? CATEGORIES.GENERAL.EN : currentCategory
      }&page=${page}&pageSize=${index}&apiKey=${API_KEY}`
    );

    const articles = response.data.articles;

    return articles;
  } catch (error) {
    console.error(error.message);
  }
};
