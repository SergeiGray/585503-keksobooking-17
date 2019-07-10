'use strict';

(function () {

  window.doDomElementsCard = function (advertisements) {
    var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    for (var i = 0; i < advertisements.length; i++) {
      var cardElement = similarCardTemplate.cloneNode(true);

      cardElement.setAttribute('style', 'left: 20%; top: 20%;');
      cardElement.querySelector('.popup__title').innerText = advertisements[i].offer.title;
      cardElement.querySelector('.popup__text--address').innerText = advertisements[i].offer.address;
      cardElement.querySelector('.popup__text--price').innerText = advertisements[i].offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').innerText = function () {
        switch (advertisements[i].offer.type) {
          case 'bungalo':
            return 'Бунгало';
          case 'flat':
            return 'Квартира';
          case 'house':
            return 'Дом';
          case 'palace':
            return 'Дворец';
          default:
            return 'Жилище';
        }
      }();
      cardElement.querySelector('.popup__text--capacity').innerText = advertisements[i].offer.rooms + ' комнаты для ' + advertisements[i].offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + advertisements[i].offer.checkin + ', выезд до ' + advertisements[i].offer.checkout;
      cardElement.querySelector('.popup__description').innerText = advertisements[i].offer.description;
      cardElement.querySelector('.popup__avatar').setAttribute('src', advertisements[i].author.avatar);

      Array.from(cardElement.querySelector('.popup__features').children).forEach(function (elem) {
        var counter = 0;
        for (var j = 0; j < advertisements[i].offer.features.length; j++) {
          if (elem.getAttribute('class').indexOf('--' + advertisements[i].offer.features[j]) !== -1) {
            counter++;
          }
        }
        if (counter < 1) {
          cardElement.querySelector('.popup__features').removeChild(elem);
        }
      });

      for (var k = 0; k < advertisements[i].offer.photos.length; k++) {
        var photoDomElement = cardElement.querySelector('.popup__photo').cloneNode(true);
        photoDomElement.setAttribute('src', advertisements[i].offer.photos[k]);
        cardElement.querySelector('.popup__photos').appendChild(photoDomElement);
      }
      cardElement.querySelector('.popup__photos').firstElementChild.remove();
      cardElement.setAttribute('style', 'display: none;');

      window.mapPins.appendChild(cardElement);
    }
  };

})();
