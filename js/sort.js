'use strict';

(function () {

  var form = document.querySelector('.map__filters');


  var sortPins = function() {

    form.addEventListener('change', function(evt) {

      var pinsInfiltrated = window.pins.filter(function(pin) {

        var type = form.elements['housing-type'].value;
        var price = form.elements['housing-price'].value;
        var rooms = form.elements['housing-rooms'].value;
        var guests = form.elements['housing-guests'].value;
        var fieldset = form.elements['housing-features'];
        var features = [];
        var isEqual = function (value) {
          return this.includes(value);
        };

        for (var i = 0; i < fieldset.elements.length; i++) {
          if ( fieldset.elements[i].checked ) {
            features.push(fieldset.elements[i].value);
          };
        };


        if( type === pin.offer.type || type === 'any' ) {
        } else {
          return false;
        };

        switch (price) {
          case 'middle':
            if( pin.offer.price >= 10000 && pin.offer.price < 50000 ) {
              break;
            } else {
              return false;
            };
          case 'low':
            if( pin.offer.price < 10000 ) {
              break;
            } else {
              return false;
            };
          case 'high':
            if( pin.offer.price >= 50000 ) {
              break;
            } else {
              return false;
            };
          case 'any':
            break;
        };

        if(rooms === String(pin.offer.rooms) || rooms === 'any' ) {
        } else {
          return false;
        };

        if( guests === String(pin.offer.guests) ||  guests === 'any' ) {
        } else {
          return false;
        };

        if ( features.length === 0 || features.length <= pin.offer.features.length && features.every( isEqual, pin.offer.features )) {
        } else {
          return false;
        };



        return true;
      });

      var updatePins = function() {
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
