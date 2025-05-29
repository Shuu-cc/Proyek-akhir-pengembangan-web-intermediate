import IdbHelper from '../../data/idb-helper.js';

class OfflinePage {
  async render() {
    return `
      <section class="offline">
        <h2>📥 Story Favorit (Offline)</h2>
         <button id="back-home" style="margin-bottom: 10px;">⬅ Kembali ke Beranda</button>
        <ul id="offline-story-list"></ul>
      </section>
    `;
  }

  async afterRender() {
    this._renderFavorites();
  }

  async _renderFavorites() {
    const list = document.querySelector('#offline-story-list');
    const favorites = await IdbHelper.getAllFavorites();
    const backBtn = document.querySelector('#back-home');

  backBtn.addEventListener('click', () => {
    window.location.hash = '#/';
  });

    if (!favorites.length) {
      list.innerHTML = '<li>Tidak ada favorit disimpan.</li>';
      return;
    }

    list.innerHTML = '';
    favorites.forEach((story) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <p><strong>${story.name}</strong></p>
        <p>${story.description}</p>
        <button data-id="${story.id}" class="remove-btn">🗑 Hapus</button>
      `;
      list.appendChild(li);
    });

    document.querySelectorAll('.remove-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        await IdbHelper.deleteFavorite(id);
        this._renderFavorites(); // re-render list
      });
    });
  }
}

export default OfflinePage;
