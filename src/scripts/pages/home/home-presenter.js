import MapView from '../../components/map/map-view.js';
import HomeModel from './home-model.js';

class HomePresenter {
  constructor({ view }) {
    this._view = view;
  }

  async init() {
    try {
      const stories = await HomeModel.getStories();
      if (!stories.length) {
        this._view.showEmpty();
        return;
      }

      this._view.showStories(stories);
      this._view.showMap(stories);
    } catch (err) {
      this._view.showError(err.message);
    }
  }

  async clearCache() {
    await HomeModel.clearCachedStories();
    this._view.showMessage('🧹 Cache berhasil dibersihkan.');
  }
}

export default HomePresenter;
