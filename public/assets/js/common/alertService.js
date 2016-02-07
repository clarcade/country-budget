var MAIN = (function (main) {
  main.alertService = {};

  var alerts = {
    'error': {
      'title': "Error"
    },
    'success': {
      'title': "Success"
    },
    'warning': {
      'title': "Warning"
    },
    'info': {
      'title': "Information"
    }
  };

  var body_elem = document.getElementsByTagName('body')[0];
  var alert_container_elem = null;

  main.alertService.close = function (alert_box) {
    if (!alert_box) {
      console.error('No alert_box provided');
    } else if (!alert_container_elem) {
      console.error('No alert container exists');
    } else {
      alert_container_elem.removeChild(alert_box);

      if (alert_container_elem.childNodes.length === 0) {
        alert_container_elem.parentNode.removeChild(alert_container_elem);
        alert_container_elem = null;
      }
    }
  };

  main.alertService.addAlert = function (alert) {
    alert = {
      type: 'error',
      text: 'This is an example error message'
    };

    if (alert) {
      if (alert.type === 'error' ||
        alert.type === 'success' ||
        alert.type === 'warning' ||
        alert.type === 'info') {
        if (!alert_container_elem) {
          alert_container_elem = document.createElement('div');
          alert_container_elem.className = 'alert-container';
          body_elem.appendChild(alert_container_elem);
        }

        var alert_template =
          '<div class="flex-column">' +
            '<div class="alert-title-container alert-' + alert.type + '">' +
              '<div></div>' +
              '<div class="flex-center">' +
                alerts[alert.type].title +
              '</div>' +
              '<div class="exit-button-container">' +
                '<div class="exit-button" ' +
                     'onclick="MAIN.alertService.close(this.parentNode.parentNode.parentNode)">' +
                  '&times;' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<p>' +
              alert.text +
            '</p>' +
          '</div>';

        alert_container_elem.innerHTML += alert_template;

        //var alert_template =
        //  '<div class="flex-column">' +
        //    '<div class="alert-title-container alert-' + alert.type + '">' +
        //      '<div></div>' +
        //      '<div class="flex-center">' +
        //        alerts[alert.type].title +
        //      '</div>' +
        //      '<div class="exit-button-container">' +
        //        '<div class="exit-button">X</div>' +
        //      '</div>' +
        //    '</div>' +
        //    '<p>' +
        //      alert.text +
        //    '</p>' +
        //  '</div>';
      } else {
        console.error(alert.type + ' not supported');
      }
      //if (alert.type === 'error') {
      //} else if (alert.type === 'success') {
      //} else if (alert.type === 'warning') {
      //} else if (alert.type === 'info') {
      //} else {
      //  console.error(alert.type + ' not supported');
      //}
    } else {
      console.error("alert info not provided");
    }
  };

  return main;
})(MAIN || {});
