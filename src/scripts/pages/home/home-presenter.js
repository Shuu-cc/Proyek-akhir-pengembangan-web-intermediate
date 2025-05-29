import MapView from '../../components/map/map-view.js';
import HomeModel from './home-model.js';
import IdbHelper from '../../data/idb-helper.js';

class HomePresenter {
  constructor({ view }) {
    this._view = view;
    this._view._presenter = this;

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
      const fallback = await this._model.getStoriesFromIdb();

      if (fallback.length) {
        this._view.showStories(fallback);
        this._view.showMap(fallback);
      } else {
        this._view.showError('❌ Gagal mengambil data. Coba lagi nanti.');
      }
    }
  }

  async addFavorite(story) {
    await IdbHelper.addFavorite(story);
    // this._view.showMessage('❤️ Story disimpan ke Favorit (Offline)');
  }

  async clearCache() {
    await HomeModel.clearCachedStories();
    this._view.showMessage('🧹 Cache berhasil dibersihkan.');
  }
}

export default HomePresenter;
