var SIGNIN = (function (signin) {
  var form_field_ids = ['email-input', 'password-input'];
  var form_field_elements = [];

  form_field_ids.forEach(function (field_id) {
    form_field_elements.push(document.getElementById(field_id));
  });

  form_field_elements.forEach(function (field_element) {
    field_element.addEventListener('keypress', function (event) {
      if (event.keyCode === 13) {
        signin.submit();
      }
    })
  });

  function validateFormFields() {
    form_field_elements.forEach(function (form_element) {
      if (form_element.checkValidity()) {
        if (form_element.className === 'input-error') {
          form_element.className = '';
          form_element.onchange = null;
        }
      } else {
        if (form_element.className === '') {
          form_element.className = 'input-error';
          form_element.onchange = validateFormFields;
        }
      }
    });
  }

  signin.submit = function () {
    var form = document.getElementById("form-signin");

    if (form.checkValidity()) {
      console.log("Form valid");

      var user_data = {
        'data': {
          'email': form['email'].value,
          'password': form['password'].value
        }
      }
      , url = "http://localhost:3000/api/authenticate"
      , method = "POST"
      , async = true
      , ajax = new XMLHttpRequest();

      ajax.onreadystatechange = function() {
        if (ajax.readyState === 4) {
          var status = ajax.status;

          if (status === 200 || status === 400) {
            var response_text = ajax.responseText;

            try {
              var data = JSON.parse(response_text);

              if (data.success) {
                console.log("success!");
                window.location.href = "http://localhost:3000/lihp";
              } else {
                if (data.error && data.error.message) {
                  console.error(data.error.message);
                } else {
                  console.error("Failed to authenticate email/password");
                }
              }
            } catch (err) {
              console.error(err);
            }
          }
        }
      };

      ajax.open(method, url, async);
      ajax.setRequestHeader("Content-type","application/json");
      ajax.send(JSON.stringify(user_data));
    } else {
      console.error("Form not valid.");

      validateFormFields();
    }
  };

  return signin;
})(SIGNIN || {});
