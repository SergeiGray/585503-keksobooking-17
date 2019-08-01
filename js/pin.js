'use strict';

(function () {

  window.mapPins = document.querySelector('.map__pins');

  window.doDomElements = function (advertisements) {
    var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    advertisements.forEach(function (elem) {
      if (elem.offer !== undefined) {
        var pinElement = similarPinTemplate.cloneNode(true);

        pinElement.setAttribute('style', 'left: ' + elem.location.x + 'px; ' + 'top: ' + elem.location.y + 'px; ');
        pinElement.querySelector('img').setAttribute('src', elem.author.avatar);
        pinElement.querySelector('img').setAttribute('alt', elem.offer.title);
        pinElement.classList.add('map__pin_filter');
        pinElement.setAttribute('data-title', elem.offer.title);

        window.showPopUp(pinElement);

        window.mapPins.appendChild(pinElement);
      }
    });
  };

})();
