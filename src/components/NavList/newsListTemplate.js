export const newsListSectionTemplate = () => {
  return `
  <div class="news-list-container">
    <article class="news-list"></article>
    <div class="scroll-observer">
      <img src="img/ball-triangle.svg" alt="Loading..." />
    </div>
</div>
   `;
};

export const newsArticleTemplate = (link, img, title, article) => {
  return `
  <section class="news-item">
    <div class="thumbnail">
        <a href=${link} target="_blank" rel="noopener noreferrer">
          <img
            src=${img}
            alt="thumbnail" />
        </a>
    </div>
    <div class="contents">
        <h2>
          <a href=${link} target="_blank" rel="noopener noreferrer">
            ${title}
          </a>
        </h2>
        <p>
          ${article}
        </p>
    </div>
  </section>
  `;
};
