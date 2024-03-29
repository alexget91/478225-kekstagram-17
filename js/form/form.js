// Форма добавления изображения (загрузка изображения, слайдер эффектов)
'use strict';

(function () {
  var EFFECT_SLIDER_DEFAULT_VALUE = 100;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  var photoInput = document.querySelector('#upload-file');
  var imageUploadForm = document.querySelector('.img-upload__overlay');
  var uploadedImage = imageUploadForm.querySelector('.img-upload__preview img');
  var effectLevel = imageUploadForm.querySelector('.effect-level');
  var effectLevelInput = effectLevel.querySelector('.effect-level__value');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

  var setEffectSliderPosition = function (position) {
    var percent = typeof position !== 'undefined' ? position / effectLevelLine.offsetWidth * 100 : EFFECT_SLIDER_DEFAULT_VALUE;

    effectLevelInput.value = Math.round(percent);
    effectLevelPin.style.left = percent + '%';
    effectLevelDepth.style.width = percent + '%';
  };

  photoInput.addEventListener('change', function (evt) {
    var files = evt.target.files;

    if (FileReader && files && files.length) {
      var matches = FILE_TYPES.some(function (it) {
        return files[0].name.toLowerCase().endsWith(it);
      });

      if (matches) {
        var fileReader = new FileReader();

        fileReader.addEventListener('load', function () {
          uploadedImage.src = fileReader.result;
        });

        fileReader.readAsDataURL(files[0]);
        // window.error.hide();
        formPopup.open();

      } else {
        window.error.show('Некорректный формат файла');
      }
    }
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      var newPosition = effectLevelPin.offsetLeft - startX + moveEvt.clientX;

      if (newPosition >= 0 && newPosition <= effectLevelLine.offsetWidth) {
        startX = moveEvt.clientX;
        setEffectSliderPosition(newPosition);
        window.effects.setUploadedImageFilter();
      }
    };

    var onMouseUp = function () {
      window.effects.setUploadedImageFilter();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var formPopup = window.popup(imageUploadForm);

  formPopup.checkClosePossibility = function (target) {
    return target !== imageUploadForm.querySelector('.text__description')
      && target !== imageUploadForm.querySelector('.js-hashtags');
  };

  formPopup.onPopupClose = function () {
    photoInput.value = '';
  };

  window.form = {setEffectSliderPosition: setEffectSliderPosition};
})();
