import OfflineModel from './offline-model.js';

class OfflinePresenter {
  constructor({ view }) {
    this._view = view;
  }

  async init() {
    const stories = await OfflineModel.getCachedStories();
    if (!stories.length) {
      this._view.showEmpty();
    } else {
      this._view.showStories(stories);
    }
  }
}

export default OfflinePresenter;
