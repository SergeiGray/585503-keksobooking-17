'use strict';

(function () {

  var getRandomNumber = function (max, min) {
    if (min === undefined) {
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.generateAdvertisementMock = function () {
    var NUMBER_OF_OBJECTS = 8;
    var mapPinsWidth = window.mapPins.offsetWidth;
    var mapPinsHeightMin = 130;
    var mapPinsHeightMax = 630;
    var offerTypeVariants = ['palace', 'flat', 'house', 'bungalo'];

    for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
      window.advertisements[i] = {
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

})();
