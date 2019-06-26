// Применение эффектов к изображению
'use strict';

(function () {
  var EFFECTS = {
    'chrome': {
      filter: 'grayscale',
      min: 0,
      max: 1
    },
    'sepia': {
      filter: 'sepia',
      min: 0,
      max: 1
    },
    'marvin': {
      filter: 'invert',
      min: 0,
      max: 100,
      unit: '%'
    },
    'phobos': {
      filter: 'blur',
      min: 0,
      max: 3,
      unit: 'px'
    },
    'heat': {
      filter: 'brightness',
      min: 1,
      max: 3
    }
  };
  var EFFECT_CSS_CLASS = 'effects__preview--';


  var photoInput = document.querySelector('#upload-file');
  var imageUploadForm = document.querySelector('.img-upload__overlay');
  var uploadedImage = imageUploadForm.querySelector('.img-upload__preview img');
  var uploadedImageDefaultClass = uploadedImage.getAttribute('class');
  var effectsList = imageUploadForm.querySelector('.effects__list');
  var effectLevel = imageUploadForm.querySelector('.effect-level');
  var effectLevelInput = effectLevel.querySelector('.effect-level__value');

  var setUploadImageClass = function (value) {
    uploadedImage.setAttribute('class', uploadedImageDefaultClass ? uploadedImageDefaultClass : '');
    uploadedImage.classList.add(value);
  };

  var getEffectValue = function (name, value) {
    if (EFFECTS[name]) {
      var unit = EFFECTS[name].unit || '';
      return EFFECTS[name].filter + '(' + ((EFFECTS[name].max - EFFECTS[name].min) / 100 * value + EFFECTS[name].min) + unit + ')';
    }
    return null;
  };

  var setUploadedImageFilter = function () {
    uploadedImage.style.filter = getEffectValue(effectsList.querySelector('.effects__radio:checked').value, effectLevelInput.value);
  };

  var applyEffect = function (effect) {
    if (effect !== 'none') {
      window.form.setEffectSliderPosition();
      effectLevel.classList.remove('hidden');

    } else {
      effectsList.querySelector('#effect-none').checked = true;
      effectLevel.classList.add('hidden');
    }

    setUploadImageClass(EFFECT_CSS_CLASS + effect);
    setUploadedImageFilter();
  };

  photoInput.addEventListener('change', function () {
    applyEffect('none');
  });

  effectsList.addEventListener('change', function (evt) {
    if (evt.target.name === 'effect') {
      applyEffect(evt.target.value);
    }
  });

  window.effects = {setUploadedImageFilter: setUploadedImageFilter};
})();
