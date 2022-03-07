export default class Component {
  $target;
  props;
  state;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.initialState();
  }

  async initialState() {
    this.render();
  }

  setState(newState) {
    this.state = newState;
    this.render();

    console.log('state', this.state);
  }

  template() {
    return ``;
  }

  render() {
    this.$target.innerHTML = this.template();

    this.componentDidMount();
  }

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

  loadMoreNews(target, position, template) {
    target.insertAdjacentHTML(position, template);
  }

  componentDidMount() {}
}
