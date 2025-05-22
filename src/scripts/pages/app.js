import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

const App = {
  async renderPage() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const page = routes[url];
    const appContainer = document.querySelector('#app');

    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        appContainer.innerHTML = await page.render();
        await page.afterRender?.();
      });
    } else {
      appContainer.innerHTML = await page.render();
      await page.afterRender?.();
    }
  },

  init() {
    window.addEventListener('hashchange', () => this.renderPage());
    window.addEventListener('load', () => this.renderPage());
  },
};

export default App;
