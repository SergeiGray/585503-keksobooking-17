'use strict';

(function () {
  var HOUSE_TYPE_MIN_PRICES = {'bungalo': 0, 'flat': 1000, 'house': 5000, 'palace': 10000};
  var advertisements = [];
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormHousingType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var firstDiscovery = true;

  var mapSelectFilters = mapFilters.querySelectorAll('select');
  var mapInputFilters = mapFilters.querySelectorAll('input');
  var mapFieldsetFilters = mapFilters.querySelectorAll('fieldset');
  var mapSelectAdForm = adForm.querySelectorAll('select');
  var mapInputAdForm = adForm.querySelectorAll('input');
  var mapFieldsetAdForm = adForm.querySelectorAll('fieldset');
  var formElements = [mapSelectFilters, mapInputFilters, mapFieldsetFilters, mapSelectAdForm, mapInputAdForm, mapFieldsetAdForm];

  var getRandomNumber = function (max, min) {
    if (min === undefined) {
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var generateAdvertisementMock = function () {
    var NUMBER_OF_OBJECTS = 8;
    var mapPinsWidth = mapPins.offsetWidth;
    var mapPinsHeightMin = 130;
    var mapPinsHeightMax = 630;
    var offerTypeVariants = ['palace', 'flat', 'house', 'bungalo'];

    for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
      advertisements[i] = {
        author: {
          avatar: 'img/avatars/user' + (i + 1).toString().padStart(2, 0) + '.png'
        },
        offer: {
          type: offerTypeVariants[getRandomNumber(offerTypeVariants.length - 1)],
          title: 'Заголовок ' + (i + 1)
        },
        location: {
          x: getRandomNumber(mapPinsWidth),
          y: getRandomNumber(mapPinsHeightMax, mapPinsHeightMin)
        }
      };
    }
  };

  var doDomElements = function () {
    var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    for (var i = 0; i < advertisements.length; i++) {
      var pinElement = similarPinTemplate.cloneNode(true);
      pinElement.setAttribute('style', 'left: ' + advertisements[i].location.x + 'px; ' + 'top: ' + advertisements[i].location.y + 'px; ');
      pinElement.querySelector('img').setAttribute('src', advertisements[i].author.avatar);
      pinElement.querySelector('img').setAttribute('alt', advertisements[i].offer.title);

      mapPins.appendChild(pinElement);
    }
  };

  var updateFormElementsState = function (forms, isDisabled) {
    for (var i = 0; i < forms.length; i++) {
      for (var j = 0; j < forms[i].length; j++) {
        forms[i][j].disabled = isDisabled;
      }
    }

  };

  var disablePage = function () {

    updateFormElementsState(formElements, true);
  };

  var syncHousingTypeAndPrice = function (evt) {
    adFormPrice.setAttribute('min', HOUSE_TYPE_MIN_PRICES[evt.target.value]);
    adFormPrice.setAttribute('placeholder', HOUSE_TYPE_MIN_PRICES[evt.target.value]);
  };

  var syncTimeInAndTimeOut = function (evt) {
    if (evt.target.name === 'timein') {
      adFormTimeOut.value = evt.target.value;
    } else {
      adFormTimeIn.value = evt.target.value;
    }
  };

  var movingMapPinMain = function () {

    mapPinMain.addEventListener('mousedown', function (evt) {
      var startCoords = {x: evt.clientX, y: evt.clientY};

      var mouseMoveHandler = function (moveEvt) {
        var shiftPinMain = {x: startCoords.x - moveEvt.clientX, y: startCoords.y - moveEvt.clientY};
        startCoords = {x: moveEvt.clientX, y: moveEvt.clientY};
        mapPinMain.style.top = (mapPinMain.offsetTop - shiftPinMain.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shiftPinMain.x) + 'px';
      };

      var mouseUpHandler = function () {
        mapPinMain.removeEventListener('mousemove', mouseMoveHandler);
        mapPinMain.removeEventListener('mouseup', mouseUpHandler);
      };

      var showMapHandler = function () {
        map.classList.remove('map--faded');
        generateAdvertisementMock();
        doDomElements();
        adForm.classList.remove('ad-form--disabled');
        updateFormElementsState(formElements, false);
      };

      var writeCoordinatesHandler = function () {
        var pinCoordinates = mapPinMain.getBoundingClientRect();
        adFormAddress.value = Math.round(pinCoordinates.top + pageYOffset + 50) + '.' + Math.round(pinCoordinates.left + pageXOffset);
      };

      if (firstDiscovery) {
        showMapHandler();
        firstDiscovery = false;
      }

      mapPinMain.addEventListener('mousemove', mouseMoveHandler);
      mapPinMain.addEventListener('mouseup', mouseUpHandler);
      mapPinMain.addEventListener('mouseup', writeCoordinatesHandler);
    });
  };

  disablePage();
  movingMapPinMain();

  adFormHousingType.addEventListener('change', syncHousingTypeAndPrice);
  adFormTimeIn.addEventListener('change', syncTimeInAndTimeOut);
  adFormTimeOut.addEventListener('change', syncTimeInAndTimeOut);
})();
