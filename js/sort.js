'use strict';

(function () {

  var form = document.querySelector('.map__filters');

  var sortPins = function () {

    form.addEventListener('change', function () {

      var pinsInfiltrated = window.pins.filter(function (pin) {

        var type = form.elements['housing-type'].value;
        var price = form.elements['housing-price'].value;
        var rooms = form.elements['housing-rooms'].value;
        var guests = form.elements['housing-guests'].value;
        var fieldset = form.elements['housing-features'];
        var features = [];
        var isEqual = function (value) {
          return pin.offer.features.includes(value);
        };

        Array.from(fieldset.elements).forEach(function (elem) {
          if (elem.checked) {
            features.push(elem.value);
          }
        });

        if (!(type === pin.offer.type || type === 'any')) {
          return false;
        }

        switch (price) {
          case 'middle':
            if (!(pin.offer.price >= 10000 && pin.offer.price < 50000)) {
              return false;
            }
            break;
          case 'low':
            if (!(pin.offer.price < 10000)) {
              return false;
            }
            break;
          case 'high':
            if (!(pin.offer.price >= 50000)) {
              return false;
            }
            break;
          case 'any':
            break;
        }

        if (!(rooms === String(pin.offer.rooms) || rooms === 'any')) {
          return false;
        }

        if (!(guests === String(pin.offer.guests) || guests === 'any')) {
          return false;
        }

        if (!(features.length === 0 || features.length <= pin.offer.features.length && features.every(isEqual))) {
          return false;
        }

        return true;
      });

      var updatePins = function () {
        Array.from(document.querySelectorAll('.map__pin_filter')).forEach(function (elem) {
          elem.parentNode.removeChild(elem);
        });
        Array.from(document.querySelectorAll('.map__card')).forEach(function (elem) {
          elem.parentNode.removeChild(elem);
        });

        window.doDomElements(pinsInfiltrated.slice(0, 5));
        window.doDomElementsCard(pinsInfiltrated.slice(0, 5));
      };

      window.debounce(updatePins);

    });
  };

  sortPins();

}());
