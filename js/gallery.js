// Галерея изображений
'use strict';

(function () {
  var renderPreview = function (template, data) {
    var photoElement = template.cloneNode(true);

    photoElement.querySelector('.picture__img').src = data.url;
    photoElement.querySelector('.picture__likes').textContent = data.likes;
    photoElement.querySelector('.picture__comments').textContent = data.comments.length;

    return photoElement;
  };

  var renderPreviewList = function (photos) {
    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var photosFragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      photosFragment.appendChild(renderPreview(photoTemplate, photos[i]));
    }

    return photosFragment;
  };

  window.backend.load(function (arrPhotos) {
    document.querySelector('.pictures').appendChild(renderPreviewList(arrPhotos));
  });
})();
