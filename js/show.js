'use strict';

(function () {

  window.showPopUp = function (pin) {

    var handlePinClick = function (evt) {
      var ESC_KEYCODE = 27;
      var cards = document.querySelectorAll('.popup__text--address');
      var pinParent = evt.target.parentElement;
      var pinAddress = pinParent.dataset.address;

      cards.forEach(function (card) {
        card.parentElement.setAttribute('style', 'display: none;');
      });

      cards.forEach(function (card) {
        if (pinAddress === card.innerText) {
          var cardBlock = card.parentElement;
          var cardBlockClose = cardBlock.querySelector('.popup__close');
          cardBlock.setAttribute('style', 'display: block;');
          cardBlockClose.addEventListener('click', function () {
            cardBlock.setAttribute('style', 'display: none;');
          });
          document.addEventListener('keydown', function (key) {
            if (key.keyCode === ESC_KEYCODE) {
              cardBlock.setAttribute('style', 'display: none;');
            }
          });
        }
      });
    };

    pin.addEventListener('click', handlePinClick);
  };

})();


// console.log(pin.dataset.address);
