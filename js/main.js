'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Артём', 'Екатерина', 'Дмитрий', 'Олег', 'Анна', 'Пётр'];
var PHOTOS_COUNT = 25;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var EFFECT_CSS_CLASS = 'effects__preview--';
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
var EFFECT_SLIDER_DEFAULT_VALUE = 100;

var SCALE_MIN = 25;
var SCALE_MAX = 100;
var SCALE_STEP = 25;
var SCALE_DEFAULT = 100;


var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (++max - min)) + min;
};

var getRandomValue = function (arrData) {
  return arrData[getRandomInt(0, arrData.length - 1)];
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var getPhotoUrls = function () {
  var urls = [];

  for (var i = 1; i <= PHOTOS_COUNT; i++) {
    urls.push('photos/' + i + '.jpg');
  }
  urls.sort(compareRandom);

  return urls;
};

var getCommentMessage = function () {
  if (getRandomInt(0, 1)) {
    var text1 = getRandomValue(COMMENTS);
    var text2 = getRandomValue(COMMENTS);

    while (text1 === text2) {
      text2 = getRandomValue(COMMENTS);
    }

    return text1 + ' ' + text2;
  }

  return getRandomValue(COMMENTS);
};

var getComments = function (minCount, maxCount) {
  var arrComments = [];

  for (var i = 0; i < getRandomInt(minCount, maxCount); i++) {
    arrComments[i] = {
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: getCommentMessage(),
      name: getRandomValue(NAMES)
    };
  }

  return arrComments;
};

var getPhotosData = function (photosCount) {
  var photosData = [];
  var photoUrls = getPhotoUrls();

  for (var i = 0; i < photosCount; i++) {
    photosData[i] = {
      url: photoUrls[i],
      likes: getRandomInt(15, 200),
      comments: getComments(1, 3)
    };
  }

  return photosData;
};

var renderPhoto = function (template, data) {
  var photoElement = template.cloneNode(true);

  photoElement.querySelector('.picture__img').src = data.url;
  photoElement.querySelector('.picture__likes').textContent = data.likes;
  photoElement.querySelector('.picture__comments').textContent = data.comments.length;

  return photoElement;
};

var renderPhotosList = function (photos) {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var photosFragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photosFragment.appendChild(renderPhoto(photoTemplate, photos[i]));
  }

  return photosFragment;
};


document.querySelector('.pictures').appendChild(renderPhotosList(getPhotosData(PHOTOS_COUNT)));

/* Загрузка изображения, эффекты */

var photoInput = document.querySelector('#upload-file');
var imageUploadForm = document.querySelector('.img-upload__overlay');
var uploadedImage = imageUploadForm.querySelector('.img-upload__preview img');
var uploadedImageDefaultClass = uploadedImage.getAttribute('class');
var uploadedImageDescription = imageUploadForm.querySelector('.text__description');
var imageUploadFormClose = imageUploadForm.querySelector('#upload-cancel');
var effectsList = imageUploadForm.querySelector('.effects__list');
var effectLevel = imageUploadForm.querySelector('.effect-level');
var effectLevelInput = effectLevel.querySelector('.effect-level__value');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

var uploadedImageScale = imageUploadForm.querySelector('.scale');
var uploadedImageScaleInput = uploadedImageScale.querySelector('.scale__control--value');

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

var setEffectSliderPosition = function (position) {
  var percent = typeof position !== 'undefined' ? position / effectLevelLine.offsetWidth * 100 : EFFECT_SLIDER_DEFAULT_VALUE;

  effectLevelInput.value = percent;
  effectLevelPin.style.left = percent + '%';
  effectLevelDepth.style.width = percent + '%';
};

photoInput.addEventListener('change', function (evt) {
  var files = evt.target.files;

  if (FileReader && files && files.length) {
    var fileReader = new FileReader();

    fileReader.onload = function () {
      uploadedImage.src = fileReader.result;
    };

    fileReader.readAsDataURL(files[0]);
  }

  applyEffect('none');
  resetUploadedImageScale();
  imageUploadForm.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscPress);
});

imageUploadFormClose.addEventListener('click', closeUploadForm);
imageUploadFormClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUploadForm();
  }
});

var applyEffect = function (effect) {
  if (effect !== 'none') {
    setEffectSliderPosition();
    effectLevel.classList.remove('hidden');

  } else {
    effectsList.querySelector('#effect-none').checked = true;
    effectLevel.classList.add('hidden');
  }

  setUploadImageClass(EFFECT_CSS_CLASS + effect);
  setUploadedImageFilter();
};

effectsList.addEventListener('change', function (evt) {
  if (evt.target.name === 'effect') {
    applyEffect(evt.target.value);
  }
});

/* Масштабирование загруженного изображения */

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

/* Перетаскиваание слайдера */

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    var newPosition = effectLevelPin.offsetLeft - startX + moveEvt.clientX;

    if (newPosition >= 0 && newPosition <= effectLevelLine.offsetWidth) {
      startX = moveEvt.clientX;
      setEffectSliderPosition(newPosition);
      setUploadedImageFilter();
    }
  };

  var onMouseUp = function () {
    setUploadedImageFilter();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
