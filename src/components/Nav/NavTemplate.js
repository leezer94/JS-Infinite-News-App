export const navTemplate = (CATEGORIES) => {
  return `
       <nav class="category-list">
        <ul>
          <li id="all" class="category-item active">${CATEGORIES.GENERAL.KR}</li>
          <li id="business" class="category-item">${CATEGORIES.BUSINESS.KR}</li>
          <li id="entertainment" class="category-item">${CATEGORIES.ENTERTAINMENT.KR}</li>
          <li id="health" class="category-item">${CATEGORIES.HEALTH.KR}</li>
          <li id="science" class="category-item">${CATEGORIES.SCIENCE.KR}</li>
          <li id="sports" class="category-item">${CATEGORIES.SPORTS.KR}</li>
          <li id="technology" class="category-item">${CATEGORIES.TECH.KR}</li>
        </ul>
      </nav>
  `;
};
