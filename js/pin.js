'use strict';

(function () {

  window.mapPins = document.querySelector('.map__pins');

  window.doDomElements = function (advertisements) {
    var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    for (var i = 0; i < advertisements.length; i++) {
      var pinElement = similarPinTemplate.cloneNode(true);
      pinElement.setAttribute('style', 'left: ' + advertisements[i].location.x + 'px; ' + 'top: ' + advertisements[i].location.y + 'px; ');
      pinElement.querySelector('img').setAttribute('src', advertisements[i].author.avatar);
      pinElement.querySelector('img').setAttribute('alt', advertisements[i].offer.title);
      pinElement.classList.add('map__pin_filter');
      pinElement.setAttribute('data-title', advertisements[i].offer.title);

      window.showPopUp(pinElement);

      window.mapPins.appendChild(pinElement);
    }
  };

})();
