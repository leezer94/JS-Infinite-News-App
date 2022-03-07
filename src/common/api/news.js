import { CATEGORIES } from '../constants.js';

export const getNews = async (currentCategory, page = 1) => {
  document.cookie = 'safeCookie1foo; SameSite=Lax';
  document.cookie = 'safeCookie1foo';
  document.cookie = 'crossCookie=bar; SameSite=None; Secure';

  let index = 5;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr&category=${
        currentCategory === 'all' ? CATEGORIES.GENERAL.EN : currentCategory
      }&page=${page}&pageSize=${index}&apiKey=d4d4acef12374e57b8c24c1b0aa1d634`
    );

    const articles = response.data.articles;

    return articles;
  } catch (error) {
    // 보통 이미지를 가져오지 못하는 경우
    console.error(error);
  }
};
