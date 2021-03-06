'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var COORDS_Y_MIN = 130;
  var COORDS_Y_MAX = 630;
  var COORDS_X_MIN = 0;
  var PIN_ARROW_HEIGHT = 15;
  window.NUMBER_OF_PINS = 5;
  var map = document.querySelector('.map');
  var mainBlock = document.querySelector('main');
  var mapPinMain = document.querySelector('.map__pin--main');
  var coordsXMax = mainBlock.offsetWidth - mapPinMain.offsetWidth;
  var pinWidth = mapPinMain.offsetWidth;
  var pinHeight = mapPinMain.offsetHeight;
  window.pins = [];
  var startCoords = {};

  var showMap = function () {
    map.classList.remove('map--faded');

    window.loadData(successHandler, window.handleError);
    window.adForm.classList.remove('ad-form--disabled');
    window.updateFormElementsState(window.formElements, false);
  };

  window.writeCoordinatesInactive = function () {
    var pinCoordinates = mapPinMain.getBoundingClientRect();
    window.adForm.querySelector('#address').value = Math.round(pinCoordinates.top + pageYOffset + (pinHeight / 2)) + ', ' + Math.round(pinCoordinates.left + pageXOffset + (pinWidth / 2));
  };

  var writeCoordinatesActive = function () {
    var pinCoordinates = mapPinMain.getBoundingClientRect();
    window.adForm.querySelector('#address').value = Math.round(pinCoordinates.top + pageYOffset + pinHeight + PIN_ARROW_HEIGHT) + ', ' + Math.round(pinCoordinates.left + pageXOffset + (pinWidth / 2));
  };

  if (map.classList.contains('map--faded')) {
    window.writeCoordinatesInactive();
  }

  window.handleError = function () {
    var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');
    mainBlock.appendChild(similarErrorTemplate);
    mainBlock.querySelector('.error__button').addEventListener('click', function () {
      window.location.reload();
    });
  };

  var successHandler = function (data) {
    window.pins = data;
    window.doDomElements(window.pins.slice(0, window.NUMBER_OF_PINS));
    window.doDomElementsCard(window.pins.slice(0, window.NUMBER_OF_PINS));
  };

  var moveMapPinMain = function () {

    var handleMouseMove = function (moveEvt) {

      var shiftPinMain = {x: startCoords.x - moveEvt.clientX, y: startCoords.y - moveEvt.clientY};
      startCoords = {x: moveEvt.clientX, y: moveEvt.clientY};
      var coordsY = mapPinMain.offsetTop - shiftPinMain.y;

      var coordsX = mapPinMain.offsetLeft - shiftPinMain.x;


      switch (true) {
        case (coordsY < COORDS_Y_MIN):
          coordsY = COORDS_Y_MIN;
          break;
        case (coordsY > COORDS_Y_MAX):
          coordsY = COORDS_Y_MAX;
          break;
      }

      switch (true) {
        case (coordsX < COORDS_X_MIN):
          coordsX = COORDS_X_MIN;
          break;
        case (coordsX > coordsXMax):
          coordsX = coordsXMax;
          break;
      }


      mapPinMain.style.top = coordsY + 'px';
      mapPinMain.style.left = coordsX + 'px';
    };

    var handleMouseUp = function () {

      writeCoordinatesActive();

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    var handelMouseDown = function (evt) {

      startCoords = {x: evt.clientX, y: evt.clientY};

      if (!(getComputedStyle(mapPinMain).position === 'absolute')) {
        mapPinMain.style.position = 'absolute';
      }

      if (!(getComputedStyle(mapPinMain).zIndex < 1 || getComputedStyle(mapPinMain).zIndex === 'none')) {
        mapPinMain.style.zIndex = 2;
      }

      if (map.classList.contains('map--faded')) {
        showMap();
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    var handleKeyDown = function (keyEvt) {
      if (keyEvt.keyCode === ENTER_KEYCODE) {
        handelMouseDown(keyEvt);
        handleMouseUp(keyEvt);
      }
    };

    mapPinMain.addEventListener('mousedown', handelMouseDown);
    mapPinMain.addEventListener('keydown', handleKeyDown);
  };


  moveMapPinMain();

})();
