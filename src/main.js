import { getImagesByQuery } from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  clearInput,
} from './js/render-functions';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const btn = document.querySelector('.button');

form.addEventListener('submit', formSubmit);
let q;
let page = 1;
let totalHits = 0;
let per_page = 15;

async function formSubmit(event) {
  event.preventDefault();
  page = 1;
  showLoader();
  q = event.target.elements['search-text'].value.toLowerCase().trim();

  if (q === '') {
    hideLoader();
    hideLoadMoreButton();
    iziToast.warning({
      message: 'Please fill in all required fields',
    });
    return;
  }
  clearGallery();
  // console.log(q);
  try {
    const resAwait = await getImagesByQuery(q, page);
    totalHits = resAwait.totalHits;
    // console.log(totalHits);
    hideLoader();
    if (resAwait.hits.length === 0) {
      hideLoadMoreButton();
      //   input.value = '';
      iziToast.error({
        // title: 'X',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        // color: 'red',
      });
      return;
    } else {
      createGallery(resAwait.hits);
      clearInput();
    }

    if (Math.ceil(totalHits / per_page) <= page) {
      hideLoadMoreButton();
      iziToast.error({
        message: `No more pictures`,
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoadMoreButton();
    hideLoader();
    clearGallery();
    iziToast.error({
      // title: 'X',
      message: `Sorry, ${error}!`,
      // color: 'red',
    });
  }
}

btn.addEventListener('click', clickMoreItem);

async function clickMoreItem() {
  showLoader();
  page++;

  try {
    const resAwait = await getImagesByQuery(q, page);
    hideLoader();
    if (resAwait.hits.length === 0) {
      hideLoadMoreButton();
      clearGallery();
      iziToast.error({
        // title: 'X',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        // color: 'red',
      });
    } else {
      createGallery(resAwait.hits);
      const card = document.querySelector('.gallery-item');
      if (card) {
        const { height } = card.getBoundingClientRect();

        window.scrollBy({
          top: height * 2,
          behavior: 'smooth',
        });
      }
    }

    if (Math.ceil(totalHits / per_page) <= page) {
      hideLoadMoreButton();
      iziToast.error({
        message: `We are sorry, but you have reached the end of search results`,
      });
      return;
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    hideLoadMoreButton();
    clearGallery();
    iziToast.error({
      // title: 'X',
      message: `Sorry, ${error}!`,
      // color: 'red',
    });
  }
}

// getImagesByQuery(q, page)
//   .then(data => {
//     // console.log(data);
//     if (data.length === 0) {
//       hideLoader();
//       clearGallery();
//       input.value = '';
//       iziToast.error({
//         // title: 'X',
//         message: `Sorry, there are no images matching your search query. Please try again!`,
//         // color: 'red',
//       });
//     } else {
//       hideLoader();
//       createGallery(data);
//       input.value = '';
//     }
//     // console.log(res.data);
//   })
//       .catch(error => {
//         hideLoader();
//         clearGallery();
//         iziToast.error({
//           // title: 'X',
//           message: `Sorry, ${error}!`,
//           // color: 'red',
//         });
//       });
//   }
// }
