// Полноэкранный показ изображения
'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var show = function (photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    var comments = bigPicture.querySelector('.social__comments');
    var commentElement = comments.querySelector('.social__comment');

    comments.innerHTML = '';
    photo.comments.forEach(function (comment) {
      var currentComment = commentElement.cloneNode(true);
      var commentAvatar = currentComment.querySelector('.social__picture');

      commentAvatar.src = comment.avatar;
      commentAvatar.alt = comment.name;
      currentComment.querySelector('.social__text').textContent = comment.message;
      comments.appendChild(currentComment);
    });

    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
    photoPopup.open();
  };

  var photoPopup = window.popup(bigPicture);

  window.photo = {show: show};
})();
