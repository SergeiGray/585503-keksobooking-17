'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var dropZone = document.querySelector('.ad-form-header__drop-zone');

  // dropZone.addEventListener('dragover', function(evt) {
  //   evt.preventDefault();
  // });

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false)
  });

  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  };

  // dropZone.addEventListener('drop', function(e) {
  //   var dt = e.dataTransfer;
  //   let file = dt.files[0];
  //   console.log(file);

  //   var fileName = file.name.toLowerCase();

  //   var matches = FILE_TYPES.some(function (it) {
  //    return fileName.endsWith(it);
  //   });

  //   if (matches) {
  //     var reader = new FileReader();

  //     reader.addEventListener('load', function () {
  //       preview.parentElement.style.paddingLeft = '0';
  //       preview.parentElement.style.paddingRight = '0';
  //       preview.height = '70';
  //       preview.width = '70';
  //       preview.src = reader.result;
  //     });

  //     reader.readAsDataURL(file);
  //   }
  // });

  var fileRender = function(evt) {
    if(fileChooser.files[0] !== undefined) {
      var file = fileChooser.files[0];
        console.log(file);
    } else {
      var dt = evt.dataTransfer;
      var file = dt.files[0];
    }


    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.parentElement.style.paddingLeft = '0';
        preview.parentElement.style.paddingRight = '0';
        preview.height = '70';
        preview.width = '70';
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', fileRender);
  dropZone.addEventListener('drop', fileRender);

})();
