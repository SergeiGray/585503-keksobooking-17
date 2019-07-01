'use strict';

(function () {

  window.filterOfType = function (elem) {
    return elem.offer.type === window.housingType.value;
  };

  window.housingType.addEventListener('change', function () {
    Array.from(document.querySelectorAll('.map__pin_filter')).forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
    window.loadData(window.doDomElements, window.handleError);
  });

}());
