'use strict';

(function () {

  window.showPopUp = function (pin) {

    var handlePinClick = function (evt) {
      var ESC_KEYCODE = 27;
      var cards = document.querySelectorAll('.popup__text--address');
      var pins = document.querySelectorAll('.map__pin_filter');
      var pin = evt.currentTarget;
      var pinAddress = pin.dataset.address;

      pins.forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });

      cards.forEach(function (card) {
        card.parentElement.setAttribute('style', 'display: none;');
      });

      pin.classList.add('map__pin--active');

      cards.forEach(function (card) {
        if (pinAddress === card.innerText) {
          var cardBlock = card.parentElement;
          var cardBlockClose = cardBlock.querySelector('.popup__close');
          cardBlock.setAttribute('style', 'display: block;');
          cardBlockClose.addEventListener('click', function () {
            cardBlock.setAttribute('style', 'display: none;');
            pin.classList.remove('map__pin--active');
          });
          document.addEventListener('keydown', function (key) {
            if (key.keyCode === ESC_KEYCODE) {
              cardBlock.setAttribute('style', 'display: none;');
              pin.classList.remove('map__pin--active');
            }
          });
        }
      });
    };

    pin.addEventListener('click', handlePinClick);
  };

})();
