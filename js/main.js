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
    var titleAdvertisements = {palace: 'Сдам роскошный особняк для роскошной жизни роскошных господ.', flat: 'Cдам комнату студенту Токийского Технического Университета.', house: 'Сдам небольшой дом для семейных пар с детьми и собаками.', bungalo: 'Сдается бунгало. Немного протекает крыша, нет санузла и кухни, в соседнем бунгало живут наркоманы, но в целом место уютное.'};

    map.classList.remove('map--faded');

    var getAvatarVariants = function (lengthArr) {
      var r = [];
      for (var i = 1; i < lengthArr + 1; i++) {
        r.push(i);
      }
      return r;
    }(NUMBER_OF_OBJECTS);

    var shuffle = function (arr, variant) {
      if (variant === 'avatar') {
        for (var i = arr.length; i; i--) {
          var j;
          var x;
          j = parseInt((Math.random() * i), 10);
          x = arr[--i];
          arr[i] = arr[j];
          arr[j] = x;
        }
      }
      if (variant === 'offerType') {
        var arrCopy = arr;
        for (var k = 0; k < NUMBER_OF_OBJECTS; k++) {
          arr[k] = arrCopy[Math.floor(Math.random() * arrCopy.length)];
        }
      }
      return arr;
    };

    var getTitleAdvertisements = function (arrTypes, objTitle) {
      var arrTitles = [];
      for (var i = 0; i < arrTypes.length; i++) {
        for (var key in objTitle) {
          if (arrTypes[i] === key) {
            arrTitles[i] = objTitle[key];
          }
        }
      }

      return arrTitles;
    };

    var shuffleAvatars = shuffle(getAvatarVariants, 'avatar');
    var shuffleOfferTypes = shuffle(offerTypeVariants, 'offerType');
    var shuffleTitleAdvertisements = getTitleAdvertisements(shuffleOfferTypes, titleAdvertisements);
    var coordinateX = function (width) {
      return Math.floor(Math.random() * width);
    };
    var coordinateY = function (heightMin, heightMax) {
      return Math.floor(Math.random() * (heightMax - heightMin + 1)) + heightMin;
    };

    for (var i = 0; i < getAvatarVariants.length; i++) {
      advertisements[i] = {
        author: {
          avatar: 'img/avatars/user0' + shuffleAvatars[i] + '.png'
        },
        offer: {
          type: shuffleOfferTypes[i],
          title: shuffleTitleAdvertisements[i]
        },
        location: {
          x: coordinateX(mapPinsWidth),
          y: coordinateY(mapPinsHeightMin, mapPinsHeightMax)
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
