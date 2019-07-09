// Валидация формы добавления изображения
'use strict';

(function () {
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAGS_MAX_COUNT = 5;
  var HashtagMessages = {
    WRONG_FIRST_SYMBOL: 'Хеш-теги должны начинаться с символа #',
    TAG_TOO_SHORT: 'Хеш-тег не может состоять только из #',
    DUPLICATE_TAG: 'Хеш-теги не должны повторяться',
    MAX_COUNT_EXCEEDED: 'Максимальное количество хеш-тегов: ' + HASHTAGS_MAX_COUNT,
    TAG_TOO_LONG: 'Максимальная длина хеш-тега: ' + HASHTAG_MAX_LENGTH + ' символов'
  };


  var form = document.querySelector('.img-upload__form');
  var hashtagsInput = form.querySelector('.js-hashtags');

  var validateTag = function (tag, hashtags) {
    if (tag.length < HASHTAG_MIN_LENGTH) {
      return HashtagMessages.TAG_TOO_SHORT;

    } else if (tag.length > HASHTAG_MAX_LENGTH) {
      return HashtagMessages.TAG_TOO_LONG;

    } else if (tag.slice(0, 1) !== '#') {
      return HashtagMessages.WRONG_FIRST_SYMBOL;

    } else {
      var duplicateCount = hashtags.filter(function (currentTag) {
        return tag === currentTag;
      }).length;

      if (duplicateCount > 1) {
        return HashtagMessages.DUPLICATE_TAG;
      }
    }

    return false;
  };

  hashtagsInput.addEventListener('input', function (evt) {
    var hashtags = evt.target.value.toLowerCase().trim().split(' ');
    var errors = {};

    if (hashtags.length > HASHTAGS_MAX_COUNT) {
      errors[HashtagMessages.MAX_COUNT_EXCEEDED] = true;
    }

    for (var i = 0; i < hashtags.length; i++) {
      var message = validateTag(hashtags[i], hashtags);

      if (message) {
        errors[message] = true;
      }
    }

    evt.target.setCustomValidity(Object.keys(errors).join('; '));
  });

  /* var saveSuccessHandler = function () {
    console.log('success');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), saveSuccessHandler);
  });*/
})();
