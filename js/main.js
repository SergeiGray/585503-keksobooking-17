'use strict';

(function () {
  var advertisements = [];
  var pins = [];
  var mapPins = document.querySelector('.map__pins');

  var doGenerationMock = function () {
    var NUMBER_OF_OBJECTS = 8;
    var mapPinsWidth = mapPins.offsetWidth;
    var mapPinsHeightMin = 130;
    var mapPinsHeightMax = 630;
    var offerTypeVariants = ['palace', 'flat', 'house', 'bungalo'];
    var map = document.querySelector('.map');
    var titleAdvertisements = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'];

    map.classList.remove('map--faded');

    var getRandomNumber = function (max, min) {
      if (min === undefined) {
        min = 0;
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
      advertisements[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          type: offerTypeVariants[getRandomNumber(offerTypeVariants.length - 1)],
          title: titleAdvertisements[getRandomNumber(titleAdvertisements.length - 1)]
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

      pins[i] = pinElement;
    }
  };

  var getEductionDomElements = function () {
    for (var i = 0; i < pins.length; i++) {
      mapPins.appendChild(pins[i]);
    }
  };

  doGenerationMock();
  doDomElements();
  getEductionDomElements();

})();
