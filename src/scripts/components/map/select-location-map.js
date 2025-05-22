const SelectLocationMap = {
  render(container, onSelect) {
    const map = L.map(container).setView([-2.5, 118], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    let marker = null;
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      if (marker) marker.setLatLng([lat, lng]);
      else marker = L.marker([lat, lng]).addTo(map);
      onSelect(lat, lng);
    });
  }
};

export default SelectLocationMap;
