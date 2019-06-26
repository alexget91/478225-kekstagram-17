// Диалоговое окно загрузки изображения
'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var photoInput = document.querySelector('#upload-file');
  var imageUploadForm = document.querySelector('.img-upload__overlay');
  var uploadedImageDescription = imageUploadForm.querySelector('.text__description');
  var imageUploadFormClose = imageUploadForm.querySelector('#upload-cancel');

  var closeUploadForm = function () {
    imageUploadForm.classList.add('hidden');
    photoInput.value = '';
    document.removeEventListener('keydown', onUploadEscPress);
  };

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== uploadedImageDescription) {
      closeUploadForm();
    }
  };

  photoInput.addEventListener('change', function () {
    imageUploadForm.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscPress);
  });

  imageUploadFormClose.addEventListener('click', closeUploadForm);
  imageUploadFormClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeUploadForm();
    }
  });
})();
