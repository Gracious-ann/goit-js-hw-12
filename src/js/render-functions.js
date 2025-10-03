// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery;
const loader = document.querySelector('.loader');
const btn = document.querySelector('.button');
const input = document.querySelector('input');
const list = document.querySelector('.gallery');

export function clearInput() {
  input.value = '';
}

export function createGallery(images) {
  // console.log(images);
  // const list = document.querySelector('.gallery');

  const itemGallery = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
  </a>
  <ul class = "discription">
  <li class = "item"><h2 class = "title">Likes</h2>${likes}</li>
  <li class = "item"><h2 class = "title">Views</h2>${views}</li>
  <li class = "item"><h2 class = "title">Comments</h2>${comments}</li>
  <li class = "item"><h2 class = "title">Downloads</h2>${downloads}</li>
  </ul>
</li>`;
      }
    )
    .join('');

  //   list.insertAdjacentHTML('beforeend', itemGallery);
  list.insertAdjacentHTML('beforeend', itemGallery);

  if (!gallery) {
    gallery = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });

    gallery.on('show.simplelightbox', function (event) {
      console.log(`Open: ${event.target.querySelector('img').alt}`);
    });
  } else {
    // console.log('mmm');
    gallery.refresh();
  }
}

export function clearGallery() {
  // const list = document.querySelector('.gallery');
  list.innerHTML = '';
}

export function showLoader() {
  // const loader = document.querySelector('.loader');

  loader.classList.remove('hidden');
}

export function hideLoader() {
  // const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  // const loader = document.querySelector('.loader');

  btn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  // const loader = document.querySelector('.loader');
  btn.classList.add('hidden');
}
