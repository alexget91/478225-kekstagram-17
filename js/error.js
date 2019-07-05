// Вывод сообщения об ошибке
'use strict';

(function () {
  var show = function (message) {
    var node = document.createElement('div');
    node.id = 'error-message';
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '16px';
    node.textContent = message;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  var hide = function () {
    document.body.removeChild(document.querySelector('#error-message'));
  };

  window.error = {show: show, hide: hide};
})();
