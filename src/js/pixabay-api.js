import axios from 'axios';

export async function getImagesByQuery(query, page) {
  let per_page = 15;

  const API_KEY = '52541066-61f39c635ccb9e2a2a197a680';

  const res = await axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page,
    },
  });
  // console.log(res.data);
  return res.data;
}
