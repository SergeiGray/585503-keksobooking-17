'use strict';

(function () {

  var HOUSE_TYPE_MIN_PRICES = {'bungalo': 0, 'flat': 1000, 'house': 5000, 'palace': 10000};

  window.adForm = document.querySelector('.ad-form');
  var adFormHousingType = window.adForm.querySelector('#type');
  var adFormPrice = window.adForm.querySelector('#price');
  var adFormTimeIn = window.adForm.querySelector('#timein');
  var adFormTimeOut = window.adForm.querySelector('#timeout');
  var adFormRoomNumber = window.adForm.querySelector('#room_number');
  var adFormRoomCapacity = window.adForm.querySelector('#capacity');
  var adFormRoomCapacityNumbers = Array.from(adFormRoomCapacity.children);

  window.formElements = [];
  window.formElementsSort = [];
  var mapFilters = document.querySelector('.map__filters');
  var mapSelectFilters = mapFilters.querySelectorAll('select');
  var mapInputFilters = mapFilters.querySelectorAll('input');
  var mapFieldsetFilters = mapFilters.querySelectorAll('fieldset');
  var mapSelectAdForm = window.adForm.querySelectorAll('select');
  var mapInputAdForm = window.adForm.querySelectorAll('input');
  var mapFieldsetAdForm = window.adForm.querySelectorAll('fieldset');

  window.formElements = [mapSelectAdForm, mapInputAdForm, mapFieldsetAdForm];
  window.formElementsSort = [mapSelectFilters, mapInputFilters, mapFieldsetFilters];

  window.updateFormElementsState = function (forms, isDisabled) {
    forms.forEach(function (form) {
      form.forEach(function (elem) {
        elem.disabled = isDisabled;
      });
    });
  };

  var disablePage = function () {
    window.updateFormElementsState(window.formElements, true);
    window.updateFormElementsState(window.formElementsSort, true);
  };

  var syncHousingTypeAndPrice = function (evt) {
    adFormPrice.setAttribute('min', HOUSE_TYPE_MIN_PRICES[evt.target.value]);
    adFormPrice.setAttribute('placeholder', HOUSE_TYPE_MIN_PRICES[evt.target.value]);
  };

  var syncTimeInAndTimeOut = function (evt) {
    if (evt.target.name === 'timein') {
      adFormTimeOut.value = evt.target.value;
    } else {
      adFormTimeIn.value = evt.target.value;
    }
  };

  window.addingRoomCapacityAttribute = function (num) {
    adFormRoomCapacityNumbers.forEach(function (elem) {
      if (elem.value <= num && elem.value > 0) {
        elem.removeAttribute('disabled');
      } else {
        elem.setAttribute('disabled', '');
      }
      if (elem.hasAttribute('selected')) {
        (adFormRoomCapacity.value = elem.value);
      }
    });
  };

  var syncRoomsAndGuests = function (evt) {
    switch (evt.target.value) {
      case '1':
        window.addingRoomCapacityAttribute('1');
        break;
      case '2':
        window.addingRoomCapacityAttribute('2');
        break;
      case '3':
        window.addingRoomCapacityAttribute('3');
        break;
      case '100':
        adFormRoomCapacityNumbers.forEach(function (elem) {
          elem.setAttribute('disabled', '');
          adFormRoomCapacity.value = '0';
        });
        break;
      default:
        adFormRoomCapacityNumbers.forEach(function (elem) {
          elem.removeAttribute('disabled');
        });
        break;
    }
  };

  var forwardingAdForm = function (evt) {
    evt.preventDefault();
    window.uploadData(window.adForm);
  };

  disablePage();

  adFormHousingType.addEventListener('change', syncHousingTypeAndPrice);
  adFormTimeIn.addEventListener('change', syncTimeInAndTimeOut);
  adFormTimeOut.addEventListener('change', syncTimeInAndTimeOut);
  adFormRoomNumber.addEventListener('change', syncRoomsAndGuests);
  window.adForm.addEventListener('submit', forwardingAdForm);

})();
