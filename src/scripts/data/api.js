import CONFIG from '../config.js';

export async function fetchStories({ page = 1, size = 10, location = 1 } = {}) {

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token tidak ditemukan. Silakan login.');
  }

  const url = new URL(`${CONFIG.BASE_URL}/stories`);
  url.searchParams.append('page', page);
  url.searchParams.append('size', size);
  url.searchParams.append('location', location);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.message || `Error ${response.status}`);
  }

  return data.listStory;
}


export async function registerUser({ name, email, password }) {
  const response = await fetch(`${CONFIG.BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.message || 'Gagal register');
  }

  return data;
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${CONFIG.BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.message || 'Gagal login');
  }

  return data; 
}

export async function addNewStory({ description, photoBlob, lat, lon }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token tidak ditemukan.');

  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photoBlob);
  if (lat) formData.append('lat', lat);
  if (lon) formData.append('lon', lon);

  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.message || 'Gagal menambahkan cerita');
  }

  return data;
}


