'use strict';

(function () {

  window.doDomElements = function () {
    var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    for (var i = 0; i < window.advertisements.length; i++) {
      var pinElement = similarPinTemplate.cloneNode(true);
      pinElement.setAttribute('style', 'left: ' + window.advertisements[i].location.x + 'px; ' + 'top: ' + window.advertisements[i].location.y + 'px; ');
      pinElement.querySelector('img').setAttribute('src', window.advertisements[i].author.avatar);
      pinElement.querySelector('img').setAttribute('alt', window.advertisements[i].offer.title);

      window.mapPins.appendChild(pinElement);
    }
  };

})();
