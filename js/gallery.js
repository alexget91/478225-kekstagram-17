// Галерея изображений
'use strict';

(function () {
  var pictures = document.querySelector('.pictures');

  var renderPreview = function (template, data) {
    var photoElement = template.cloneNode(true);

    photoElement.querySelector('.picture__img').src = data.url;
    photoElement.querySelector('.picture__likes').textContent = data.likes;
    photoElement.querySelector('.picture__comments').textContent = data.comments.length;
    photoElement.dataset.id = data.id;

    return photoElement;
  };

  var renderPreviewList = function (photos) {
    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var photosFragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      photosFragment.appendChild(renderPreview(photoTemplate, photos[i]));
    }

    var pictureElements = pictures.querySelectorAll('.picture');

    for (i = 0; i < pictureElements.length; i++) {
      pictures.removeChild(pictureElements[i]);
    }

    pictures.appendChild(photosFragment);
  };

  window.backend.load(function (arrPhotos) {
    arrPhotos.forEach(function (it, index) {
      it.id = index;
    });

    renderPreviewList(arrPhotos);
    window.filters.init(arrPhotos);

    pictures.addEventListener('click', function (evt) {
      var target = evt.target;

      while (target !== pictures) {
        if (target.classList.contains('picture')) {
          evt.preventDefault();
          window.photo.show(arrPhotos[target.dataset.id]);
          return;
        }
        target = target.parentNode;
      }
    });
  });

  window.gallery = {render: renderPreviewList};
})();
