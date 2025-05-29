import { fetchStories } from '../../data/api.js';
import IdbHelper from '../../data/idb-helper.js';

const HomeModel = {
  async getStories() {
    try {
      const stories = await fetchStories();
      await IdbHelper.putStories(stories);
      return stories;
    } catch (err) {
      console.warn('📦 Offline mode: load from IndexedDB');
      return await IdbHelper.getAllStories();
    }
  },

  async getStoriesFromIdb() {
    return await IdbHelper.getAllStories(); 
  },

  async clearCachedStories() {
    await IdbHelper.clearStories();
  }
};

export default HomeModel;
