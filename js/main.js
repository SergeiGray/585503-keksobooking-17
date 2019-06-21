'use strict';

(function () {
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

  var enablePage = function () {

    var showMapHandler = function () {
      map.classList.remove('map--faded');
      generateAdvertisementMock();
      doDomElements();
      adForm.classList.remove('ad-form--disabled');
      updateFormElementsState(formElements, false);
    };

    var writeCoordinatesHandler = function () {
      var pinCoordinates = mapPinMain.getBoundingClientRect();
      adFormAddress.value = Math.round(pinCoordinates.top + pageYOffset) + '.' + Math.round(pinCoordinates.left + pageXOffset);
    };

    mapPinMain.addEventListener('click', showMapHandler);
    mapPinMain.addEventListener('mouseup', writeCoordinatesHandler);
  };

  var doDependencePriceOfType = function () {
    adFormHousingType.addEventListener('change', function (evt) {
      if (evt.target.value === 'bungalo') {
        adFormPrice.setAttribute('min', 0);
      }
      if (evt.target.value === 'flat') {
        adFormPrice.setAttribute('min', 1000);
      }
      if (evt.target.value === 'house') {
        adFormPrice.setAttribute('min', 5000);
      }
      if (evt.target.value === 'palace') {
        adFormPrice.setAttribute('min', 10000);
      }
    });
  };

  var doDependenceTimeOfDeparture = function () {
    adFormTimeIn.addEventListener('change', function (evt) {
      var adFormTimeOutOptions = adFormTimeOut.options;
      var adFormTimeInValue = evt.target.value;

      for (var i = 0; i < adFormTimeOutOptions.length; i++) {
        if (adFormTimeInValue === adFormTimeOutOptions[i].value) {
          adFormTimeOutOptions[i].selected = true;
        }
      }
    });
    adFormTimeOut.addEventListener('change', function (evt) {
      var adFormTimeInOptions = adFormTimeIn.options;
      var adFormTimeOutValue = evt.target.value;

      for (var i = 0; i < adFormTimeInOptions.length; i++) {
        if (adFormTimeOutValue === adFormTimeInOptions[i].value) {
          adFormTimeInOptions[i].selected = true;
        }
      }
    });
  };

  disablePage();
  enablePage();
  doDependencePriceOfType();
  doDependenceTimeOfDeparture();

})();
