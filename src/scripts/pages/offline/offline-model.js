import IdbHelper from '../../data/idb-helper.js';

const OfflineModel = {
  async getCachedStories() {
    return await IdbHelper.getAllStories();
  },
};

export default OfflineModel;
