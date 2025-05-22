import { openDB } from 'idb';

const DB_NAME = 'story-app-db';
const STORE_NAME = 'stories';
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

const IdbHelper = {
  async putStories(stories) {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    stories.forEach((story) => tx.store.put(story));
    await tx.done;
  },

  async getAllStories() {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
  },

  async clearStories() {
    const db = await dbPromise;
    return db.clear(STORE_NAME);
  },
};

export default IdbHelper;
