const AddModel = {
  async submitStory({ description, photo, lat, lon }) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Anda harus login terlebih dahulu.');

    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    if (lat) formData.append('lat', lat);
    if (lon) formData.append('lon', lon);

    const res = await fetch(`https://story-api.dicoding.dev/v1/stories`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.message);

    return data;
  }
};

export default AddModel;