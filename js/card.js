'use strict';

(function () {

  window.doDomElementsCard = function (advertisements) {
    var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    for (var i = 0; i < advertisements.length; i++) {
      var cardElement = similarCardTemplate.cloneNode(true);
      var title = cardElement.querySelector('.popup__title');
      var address = cardElement.querySelector('.popup__text--address');
      var price = cardElement.querySelector('.popup__text--price');
      var type = cardElement.querySelector('.popup__type');
      var capacity = cardElement.querySelector('.popup__text--capacity');
      var time = cardElement.querySelector('.popup__text--time');
      var description = cardElement.querySelector('.popup__description');
      var avatar = cardElement.querySelector('.popup__avatar');
      var features = cardElement.querySelector('.popup__features');
      var photos = cardElement.querySelector('.popup__photos');

      cardElement.setAttribute('style', 'left: 20%; top: 20%;');

      if (advertisements[i].offer.title !== undefined && advertisements[i].offer.title !== '') {
        title.innerText = advertisements[i].offer.title;
      } else {
        cardElement.removeChild(title);
      }

      if (advertisements[i].offer.address !== undefined && advertisements[i].offer.address !== '') {
        address.innerText = advertisements[i].offer.address;
      } else {
        cardElement.removeChild(address);
      }

      if (advertisements[i].offer.price !== undefined && advertisements[i].offer.price !== '') {
        price.innerText = advertisements[i].offer.price + '₽/ночь';
      } else {
        cardElement.removeChild(price);
      }

      if (advertisements[i].offer.type !== undefined && advertisements[i].offer.type !== '') {
        type.innerText = function () {
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
      } else {
        cardElement.removeChild(type);
      }

      if (advertisements[i].offer.rooms !== undefined && advertisements[i].offer.rooms !== '' || advertisements[i].offer.guests !== undefined && advertisements[i].offer.guests) {
        capacity.innerText = advertisements[i].offer.rooms + ' комнаты для ' + advertisements[i].offer.guests + ' гостей';
      } else {
        cardElement.removeChild(capacity);
      }

      if (advertisements[i].offer.checkin !== undefined && advertisements[i].offer.checkin !== '' || advertisements[i].offer.checkout !== undefined && advertisements[i].offer.checkout) {
        time.innerText = 'Заезд после ' + advertisements[i].offer.checkin + ', выезд до ' + advertisements[i].offer.checkout;
      } else {
        cardElement.removeChild(time);
      }

      if (advertisements[i].offer.description !== undefined && advertisements[i].offer.description !== '') {
        description.innerText = advertisements[i].offer.description;
      } else {
        cardElement.removeChild(description);
      }

      if (advertisements[i].author.avatar !== undefined && advertisements[i].author.avatar !== '') {
        avatar.setAttribute('src', advertisements[i].author.avatar);
      } else {
        cardElement.removeChild(avatar);
      }

      if (advertisements[i].offer.features !== undefined && advertisements[i].offer.features.length !== 0) {
        Array.from(features.children).forEach(function (elem) {
          var counter = 0;
          for (var j = 0; j < advertisements[i].offer.features.length; j++) {
            if (elem.getAttribute('class').indexOf('--' + advertisements[i].offer.features[j]) !== -1) {
              counter++;
            }
          }
          if (counter < 1) {
            features.removeChild(elem);
          }
        });
      } else {
        cardElement.removeChild(features);
      }

      if (advertisements[i].offer.photos !== undefined && advertisements[i].offer.photos.length !== 0) {
        for (var k = 0; k < advertisements[i].offer.photos.length; k++) {
          var photoDomElement = cardElement.querySelector('.popup__photo').cloneNode(true);
          photoDomElement.setAttribute('src', advertisements[i].offer.photos[k]);
          photos.appendChild(photoDomElement);
        }
        photos.firstElementChild.remove();
      } else {
        cardElement.removeChild(photos);
      }

      cardElement.setAttribute('style', 'display: none;');

      window.mapPins.appendChild(cardElement);
    }
  };

})();
