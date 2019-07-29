'use strict';

(function () {

  var map = document.querySelector('.map');
  var mainBlock = document.querySelector('main');
  var mapPinMain = document.querySelector('.map__pin--main');
  var firstDiscovery = true;
  window.pins = [];

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

    var startCoords = {};

    mapPinMain.addEventListener('mousedown', function (evt) {
      startCoords = {x: evt.clientX, y: evt.clientY};
      // var startCoords = {x: evt.clientX, y: evt.clientY};
              console.log('1');
      // var handleMouseMove = function (moveEvt) {
      //   var shiftPinMain = {x: startCoords.x - moveEvt.clientX, y: startCoords.y - moveEvt.clientY};
      //   startCoords = {x: moveEvt.clientX, y: moveEvt.clientY};
      //   mapPinMain.style.top = (mapPinMain.offsetTop - shiftPinMain.y) + 'px';
      //   mapPinMain.style.left = (mapPinMain.offsetLeft - shiftPinMain.x) + 'px';
      // };

      // var handleMouseUp = function () {
      //   mapPinMain.removeEventListener('mousemove', handleMouseMove);
      //   mapPinMain.removeEventListener('mouseup', handleMouseUp);
      // };



      var showMap = function () {
        map.classList.remove('map--faded');

        window.loadData(successHandler, window.handleError);
        window.adForm.classList.remove('ad-form--disabled');
        window.updateFormElementsState(window.formElements, false);
      };

      var writeCoordinates = function () {
        var pinCoordinates = mapPinMain.getBoundingClientRect();
        window.adForm.querySelector('#address').value = Math.round(pinCoordinates.top + pageYOffset + 50) + '.' + Math.round(pinCoordinates.left + pageXOffset);
      };

      if (firstDiscovery) {
        showMap();
        firstDiscovery = false;
      }

      mapPinMain.addEventListener('mousemove', handleMouseMove);
      mapPinMain.addEventListener('mouseup', handleMouseUp);
      mapPinMain.addEventListener('mouseup', writeCoordinates);
    });

          var handleMouseMove = function (moveEvt) {
        var shiftPinMain = {x: startCoords.x - moveEvt.clientX, y: startCoords.y - moveEvt.clientY};
        startCoords = {x: moveEvt.clientX, y: moveEvt.clientY};
        mapPinMain.style.top = (mapPinMain.offsetTop - shiftPinMain.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shiftPinMain.x) + 'px';
      };

      var handleMouseUp = function () {
        mapPinMain.removeEventListener('mousemove', handleMouseMove);
        mapPinMain.removeEventListener('mouseup', handleMouseUp);
      };

  };

  moveMapPinMain();

})();
