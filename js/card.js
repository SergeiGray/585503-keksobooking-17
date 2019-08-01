'use strict';

(function () {

  window.doDomElementsCard = function (advertisements) {
    var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    advertisements.forEach(function (elem) {
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

      if (elem.offer.title !== undefined && elem.offer.title !== '') {
        title.innerText = elem.offer.title;
      } else {
        cardElement.removeChild(title);
      }

      if (elem.offer.address !== undefined && elem.offer.address !== '') {
        address.innerText = elem.offer.address;
      } else {
        cardElement.removeChild(address);
      }

      if (elem.offer.price !== undefined && elem.offer.price !== '') {
        price.innerText = elem.offer.price + '₽/ночь';
      } else {
        cardElement.removeChild(price);
      }

      if (elem.offer.type !== undefined && elem.offer.type !== '') {
        type.innerText = function () {
          switch (elem.offer.type) {
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

      if (elem.offer.rooms !== undefined && elem.offer.rooms !== '' || elem.offer.guests !== undefined && elem.offer.guests) {
        capacity.innerText = elem.offer.rooms + ' комнаты для ' + elem.offer.guests + ' гостей';
      } else {
        cardElement.removeChild(capacity);
      }

      if (elem.offer.checkin !== undefined && elem.offer.checkin !== '' || elem.offer.checkout !== undefined && elem.offer.checkout) {
        time.innerText = 'Заезд после ' + elem.offer.checkin + ', выезд до ' + elem.offer.checkout;
      } else {
        cardElement.removeChild(time);
      }

      if (elem.offer.description !== undefined && elem.offer.description !== '') {
        description.innerText = elem.offer.description;
      } else {
        cardElement.removeChild(description);
      }

      if (elem.author.avatar !== undefined && elem.author.avatar !== '') {
        avatar.setAttribute('src', elem.author.avatar);
      } else {
        cardElement.removeChild(avatar);
      }

      if (elem.offer.features !== undefined && elem.offer.features.length !== 0) {
        Array.from(features.children).forEach(function (el) {
          var counter = 0;
          for (var i = 0; i < elem.offer.features.length; i++) {
            if (el.getAttribute('class').indexOf('--' + elem.offer.features[i]) !== -1) {
              counter++;
            }
          }
          if (counter < 1) {
            features.removeChild(el);
          }
        });
      } else {
        cardElement.removeChild(features);
      }

      if (elem.offer.photos !== undefined && elem.offer.photos.length !== 0) {
        elem.offer.photos.forEach(function (photo) {
          var photoDomElement = cardElement.querySelector('.popup__photo').cloneNode(true);
          photoDomElement.setAttribute('src', photo);
          photos.appendChild(photoDomElement);
        });
        photos.firstElementChild.remove();
      } else {
        cardElement.removeChild(photos);
      }

      cardElement.setAttribute('style', 'display: none;');

      window.mapPins.appendChild(cardElement);
    // }
    });
  };

})();
