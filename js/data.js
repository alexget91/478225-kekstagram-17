// Генерация данных для галереи изображений
'use strict';

(function () {
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

  var getPhotosData = function () {
    var photosData = [];
    var photoUrls = getPhotoUrls();

    for (var i = 0; i < PHOTOS_COUNT; i++) {
      photosData[i] = {
        url: photoUrls[i],
        likes: getRandomInt(15, 200),
        comments: getComments(1, 3)
      };
    }

    return photosData;
  };

  window.data = {getPhotosData: getPhotosData};
})();
