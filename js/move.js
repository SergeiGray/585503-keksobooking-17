'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var mainBlock = document.querySelector('main');
  var mapPinMain = document.querySelector('.map__pin--main');
  window.pins = [];
  var startCoords = {};

  var showMap = function () {
    map.classList.remove('map--faded');

    window.loadData(successHandler, window.handleError);
    window.adForm.classList.remove('ad-form--disabled');
    window.updateFormElementsState(window.formElements, false);
  };

  var writeCoordinates = function () {
    var pinCoordinates = mapPinMain.getBoundingClientRect();
    window.adForm.querySelector('#address').value = Math.round(pinCoordinates.top + pageYOffset + 50) + ', ' + Math.round(pinCoordinates.left + pageXOffset + 30);
  };

  window.handleError = function () {
    var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');
    mainBlock.appendChild(similarErrorTemplate);
    mainBlock.querySelector('.error__button').addEventListener('click', function () {
      window.location.reload();
    });
  };

  var successHandler = function (data) {
    window.pins = data;
    window.doDomElements(window.pins.slice(0, 5));
    window.doDomElementsCard(window.pins.slice(0, 5));
  };

  var moveMapPinMain = function () {

    var handleMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftPinMain = {x: startCoords.x - moveEvt.clientX, y: startCoords.y - moveEvt.clientY};
      startCoords = {x: moveEvt.clientX, y: moveEvt.clientY};
      var coordsY = mapPinMain.offsetTop - shiftPinMain.y;
      var coordsX = mapPinMain.offsetLeft - shiftPinMain.x;
      var coordsXMin = 0;
      var coordsXMax = mainBlock.offsetWidth - mapPinMain.offsetWidth;

      switch (true) {
        case (coordsY < 130):
          coordsY = 130;
          break;
        case (coordsY > 630):
          coordsY = 630;
          break;
      }

      switch (true) {
        case (coordsX < coordsXMin):
          coordsX = coordsXMin;
          break;
        case (coordsX > coordsXMax):
          coordsX = coordsXMax;
          break;
      }


      mapPinMain.style.top = coordsY + 'px';
      mapPinMain.style.left = coordsX + 'px';
    };

    var handleMouseUp = function () {

      writeCoordinates();

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
