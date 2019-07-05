'use strict';

(function () {
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var DOWNLOAD_URL = 'https://js.dump.academy/kekstagram/data';

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', DOWNLOAD_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);

      } else {
        window.error.show('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.send();
  };

  var save = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);

      } else {
        window.error.show('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {load: load, save: save};
})();
