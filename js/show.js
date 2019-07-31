'use strict';

(function () {

  window.showPopUp = function (pin) {

    var handlePinClick = function () {
      var ESC_KEYCODE = 27;
      var cards = document.querySelectorAll('.popup__title');
      var pins = document.querySelectorAll('.map__pin_filter');
      var pinTitle = pin.dataset.title;
      var clickEvent = new Event('click');
      var keydownEvent = new KeyboardEvent('keydown');
      keydownEvent.initKeyEvent('keydown', true, true, null, false, false, false, false, 27, 0);

      pins.forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });

      pin.classList.add('map__pin--active');
      document.dispatchEvent(keydownEvent);

      cards.forEach(function (elem) {
        var card = elem.parentElement;
        var cardClose = card.querySelector('.popup__close');

        var handleKeyDownClose = function (key) {
          if (key.keyCode === ESC_KEYCODE) {

            card.setAttribute('style', 'display: none;');
            pin.classList.remove('map__pin--active');

            document.removeEventListener('keydown', handleKeyDownClose);
            cardClose.removeEventListener('click', handleClickClose);
          }
        };

        var handleClickClose = function () {

          card.setAttribute('style', 'display: none;');
          pin.classList.remove('map__pin--active');

          cardClose.removeEventListener('click', handleClickClose);
          document.removeEventListener('keydown', handleKeyDownClose);
        };

        card.setAttribute('style', 'display: none;');
        cardClose.dispatchEvent(clickEvent);

        if (pinTitle === elem.innerText) {
          card.setAttribute('style', 'display: block;');
          cardClose.addEventListener('click', handleClickClose);
          document.addEventListener('keydown', handleKeyDownClose);
        }
      });
    };

    pin.addEventListener('click', handlePinClick);
  };

})();
