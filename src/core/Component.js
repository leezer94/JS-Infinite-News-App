import { observable, observe } from './observer.js';

export class Component {
  state;
  props;
  $target;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
  }

  setup() {
    this.state = observable(this.initState());

    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }

  template() {
    return ``;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  // 추가 뉴스용 템플릿
  newsTemplate(link, img, title, article) {
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
  }

  // 뉴스 추가시에 쓰일 render()
  loadMoreNews(target, position, template) {
    target.insertAdjacentHTML(position, template);
  }

  setEvent() {}

  mounted() {}
}
