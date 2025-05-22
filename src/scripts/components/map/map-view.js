const MapView = {
  render(container, stories) {
    container.innerHTML = '';

    const mapDiv = document.createElement('div');
    mapDiv.id = 'leaflet-map';
    mapDiv.style.height = '500px';
    container.appendChild(mapDiv);
 
     const map = L.map(mapDiv).setView([-2.5, 118], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    stories.forEach((story) => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).addTo(map);
        marker.bindPopup(`
          <img src="${story.photoUrl}" alt="${story.name}" width="100"><br />
          <strong>${story.name}</strong><br />
          ${story.description}
        `);
      }
    });

     const bounds = stories
      .filter(s => s.lat && s.lon)
      .map(s => [s.lat, s.lon]);
    if (bounds.length) map.fitBounds(bounds);
  },
};


export default MapView;
