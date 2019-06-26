// Масштабирование загруженного изображения
'use strict';

(function () {
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;
  var SCALE_STEP = 25;
  var SCALE_DEFAULT = 100;

  var photoInput = document.querySelector('#upload-file');
  var imageUploadForm = document.querySelector('.img-upload__overlay');
  var uploadedImage = imageUploadForm.querySelector('.img-upload__preview img');
  var uploadedImageScale = imageUploadForm.querySelector('.scale');
  var uploadedImageScaleInput = uploadedImageScale.querySelector('.scale__control--value');

  var setUploadedImageScale = function (bigger) {
    var scaleValue = parseInt(uploadedImageScaleInput.value.slice(0, -1), 10);

    scaleValue = bigger ? scaleValue + SCALE_STEP : scaleValue - SCALE_STEP;

    if (scaleValue >= SCALE_MIN && scaleValue <= SCALE_MAX) {
      uploadedImageScaleInput.value = scaleValue + '%';
      uploadedImage.style.transform = 'scale(' + scaleValue / 100 + ')';
    }
  };

  var resetUploadedImageScale = function () {
    uploadedImageScaleInput.value = SCALE_DEFAULT + '%';
    uploadedImage.style.transform = null;
  };

  uploadedImageScale.querySelector('.scale__control--smaller').addEventListener('click', function () {
    setUploadedImageScale();
  });

  uploadedImageScale.querySelector('.scale__control--bigger').addEventListener('click', function () {
    setUploadedImageScale(true);
  });

  photoInput.addEventListener('change', function () {
    resetUploadedImageScale();
  });
})();
