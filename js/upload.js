'use strict';

(function () {

  var URL_FOR_UPLOAD = 'https://js.dump.academy/keksobooking';
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var mainField = document.querySelector('#main');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var startCoords = {x: mapPinMain.style.top, y: mapPinMain.style.left};

  var conditionMessage = function (status) {
    var ESC_KEYCODE = 27;
    var message = status.cloneNode(true);
    mainField.appendChild(message);
    var clickHandler = function () {
      mainField.removeChild(message);
      document.removeEventListener('click', clickHandler);
    };
    var keydownHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        mainField.removeChild(message);
        document.removeEventListener('keydown', keydownHandler);
      }
    };
    document.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keydownHandler);
  };

  var resetToInitialState = function () {

    var deletElement = function (ident) {
      document.querySelectorAll(ident).forEach(function (elem) {
        elem.parentNode.removeChild(elem);
      });
    };

    map.classList.add('map--faded');
    mapPinMain.style.top = startCoords.x;
    mapPinMain.style.left = startCoords.y;

    deletElement('.map__pin_filter');
    deletElement('.map__card');

    window.adForm.reset();
    window.adForm.classList.add('ad-form--disabled');
    window.updateFormElementsState(window.formElements, true);
  };

  window.uploadData = function (form) {

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', URL_FOR_UPLOAD);
    xhr.send(formData);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        resetToInitialState();
        conditionMessage(success);
      } else {
        conditionMessage(error);
      }
    });

    xhr.addEventListener('error', function () {
      conditionMessage(error);
    });

    xhr.timeout = 10000;

    xhr.addEventListener('timeout', function () {
      conditionMessage(error);
    });

  };

}());
