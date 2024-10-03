import * as utils from './modules/utils.js';
import * as api from './modules/api.js';

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let apiUrl = api.getUrl({ count: 5 });

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    apiUrl = api.getUrl({ count: 10 });
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    utils.setAttributes(item, {
      href: photo.url,
      target: '_blank',
    })
    // Create <img> for photo
    const img = document.createElement('img');
    utils.setAttributes(img, {
      src: photo.download_url,
      alt: photo.author,
      title: photo.author,
      loading: 'lazy', // Native lazy loading
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    photosArray = data.map((photo) => {
      return {
        id: photo.id,
        author: photo.author,
        width: photo.width,
        height: photo.height,
        url: photo.url,
        download_url: photo.download_url
      }
    })
    displayPhotos();
    
  } catch (error) {
    console.error(error)
  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos()