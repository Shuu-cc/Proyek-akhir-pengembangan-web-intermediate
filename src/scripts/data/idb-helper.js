import { openDB } from 'idb';

const DB_NAME = 'story-database';
const DB_VERSION = 2; // ⬅️ Naikkan versinya jika sebelumnya masih 1
const STORE_NAME = 'stories';
const FAVORITE_STORE = 'favorites';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains(FAVORITE_STORE)) {
      db.createObjectStore(FAVORITE_STORE, { keyPath: 'id' });
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

  async addFavorite(story) {
    const db = await dbPromise;
    return db.put(FAVORITE_STORE, story);
  },

  async getAllFavorites() {
    const db = await dbPromise;
    return db.getAll(FAVORITE_STORE);
  },

  async deleteFavorite(id) {
    const db = await dbPromise;
    return db.delete(FAVORITE_STORE, id);
  },

  async isFavorite(id) {
    const db = await dbPromise;
    return Boolean(await db.get(FAVORITE_STORE, id));
  }
};

export default IdbHelper;
