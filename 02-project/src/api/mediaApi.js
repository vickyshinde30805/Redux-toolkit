import axios from 'axios';

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;

if (!UNSPLASH_KEY) {
  console.error('Missing VITE_UNSPLASH_KEY environment variable. Create a root .env file with VITE_UNSPLASH_KEY=your_key');
}

export async function fetchPhotos(query, per_page = 20) {
  if (!UNSPLASH_KEY) {
    throw new Error('Missing VITE_UNSPLASH_KEY environment variable');
  }

  const res = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });
  

  return res.data;
}
export async function fetchVideos(query, per_page = 15) {
  if (!PEXELS_KEY) {
    throw new Error('Missing VITE_PEXELS_KEY environment variable');
  }

  const res = await axios.get('https://api.pexels.com/v1/videos/search', {
    params: { query, per_page },
    headers: { Authorization: `${PEXELS_KEY}` },
  });

  return res.data;
}
