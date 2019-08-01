'use strict';

(function () {

  var URL_FOR_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;
  var SUCCESSFUL_DOWNLOAD = 200;

  window.loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL_FOR_DOWNLOAD);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESSFUL_DOWNLOAD) {
        onSuccess(xhr.response);
        window.updateFormElementsState(window.formElementsSort, false);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

  };

}());
