'use strict';

(function () {

  var URL_FOR_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  window.housingType = document.querySelector('#housing-type');

  window.loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL_FOR_DOWNLOAD);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        if (window.housingType.value === 'any') {
          onSuccess(xhr.response.slice(0, 5));
        } else {
          onSuccess(xhr.response.filter(window.filterOfType).slice(0, 5));
        }
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = 10000;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

  };

}());
