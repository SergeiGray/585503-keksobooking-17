'use strict';

(function () {

  var URL_FOR_UPLOAD = 'https://js.dump.academy/keksobooking';
  var ESC_KEYCODE = 27;
  var TIMEOUT = 10000;
  var SUCCESSFUL_UPLOAD = 200;
  var INITIAL_VALUE_MIN_PRICE = 1000;
  var INITIAL_VALUE_PLACEHOLDER_PRICE = 5000;
  var INITIAL_VALUE_ROOM_CAPACITY = '1';
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var mainField = document.querySelector('#main');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var startCoords = {x: mapPinMain.style.top, y: mapPinMain.style.left};
  var formFilters = document.querySelector('.map__filters');
  var pageReset = document.querySelector('.ad-form__reset');
  var message;
  var adFormPrice = window.adForm.querySelector('#price');
  var formSubmitButton = document.querySelector('.ad-form__submit');

  var clickHandler = function () {
    mainField.removeChild(message);
    document.removeEventListener('click', clickHandler);
    document.removeEventListener('keydown', keydownHandler);
  };

  var keydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      mainField.removeChild(message);
      document.removeEventListener('keydown', keydownHandler);
      document.removeEventListener('click', clickHandler);
    }
  };

  var getConditionMessage = function (status) {
    message = status.cloneNode(true);
    mainField.appendChild(message);
    formSubmitButton.blur();

    document.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keydownHandler);
  };

  var resetToInitialState = function (evt) {
    if (evt !== undefined) {
      evt.preventDefault();
    }

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

    formFilters.reset();
    window.adForm.reset();
    window.adForm.classList.add('ad-form--disabled');
    window.updateFormElementsState(window.formElements, true);
    window.updateFormElementsState(window.formElementsSort, true);
    window.writeCoordinatesInactive();
    window.addingRoomCapacityAttribute(INITIAL_VALUE_ROOM_CAPACITY);
    adFormPrice.setAttribute('min', INITIAL_VALUE_MIN_PRICE);
    adFormPrice.setAttribute('placeholder', INITIAL_VALUE_PLACEHOLDER_PRICE);
  };

  window.uploadData = function (form) {

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', URL_FOR_UPLOAD);
    xhr.send(formData);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESSFUL_UPLOAD) {
        resetToInitialState();
        getConditionMessage(success);
      } else {
        getConditionMessage(error);
      }
    });

    xhr.addEventListener('error', function () {
      getConditionMessage(error);
    });

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('timeout', function () {
      getConditionMessage(error);
    });
  };

  pageReset.addEventListener('click', resetToInitialState);

}());
