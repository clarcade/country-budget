var SIGNIN = (function (signin) {
  var form_field_ids = ['email-input', 'password-input']
    , form_field_elements = []
    , auth_invalid_element = document.getElementById('email-invalid')
    , email_invalid_element = document.getElementById('email-invalid')
    , password_invalid_element = document.getElementById('password-invalid');

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
        // Form is valid
        if (form_element.className === 'input-error') {
          // Take off error css and validation checking for current form input
          form_element.className = '';
          form_element.onchange = null;
        }
        if (form_element.id === 'email-input') {
          // Remove email error message and hide email error div
          email_invalid_element.innerHTML = '';
          email_invalid_element.className = 'hide';
        } else if (form_element.id === 'password-input') {
          // Remove password message and hide password error div
          password_invalid_element.innerHTML = '';
          password_invalid_element.className = 'hide';
        }
      } else {
        // Form not valid
        if (form_element.className === '') {
          // Form input doesn't have error-input css applied
          if (form_element.id === 'email-input') {
            // Email input is invalid so apply error message and css
            email_invalid_element.innerHTML = 'Email must be in the form **@**.com';
            email_invalid_element.className = '';
          } else if (form_element.id === 'password-input') {
            // Password input is invalid so apply error message and css
            password_invalid_element.innerHTML = 'Please enter password';
            password_invalid_element.className = '';
          }

          // Apply input-error css and validation checking to current form input
          form_element.className = 'input-error';
          form_element.onchange = validateFormFields;
        }
      }
    });
  }

  signin.submit = function () {
    var form = document.getElementById("form-signin");

    if (form.checkValidity()) {
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

          if (status === 200 ||
            status === 400 ||
            status === 500) {
            var response_text = ajax.responseText;

            try {
              var data = JSON.parse(response_text);

              if (data.success) {
                window.location.href = "http://localhost:3000/lihp";
              } else {
                if (data.error && data.error.message) {
                  var error_message = data.error.message;

                  if (data.error.field) {
                    var error_field = data.error.field;

                    if (error_field === 'email') {
                      email_invalid_element.innerHTML = error_message;
                      email_invalid_element.className = '';

                      var email_input_elem = document.getElementById('email-input');
                      email_input_elem.className = 'input-error';
                      email_input_elem.onchange = validateFormFields;
                    } else if (error_field === 'password') {
                      password_invalid_element.innerHTML = error_message;
                      password_invalid_element.className = '';

                      var password_input_elem = document.getElementById('password-input');
                      password_input_elem.className = 'input-error';
                      password_input_elem.onchange = validateFormFields;
                    } else {
                      console.error('Unknown field type: ', error_field);
                    }
                  } else {
                    auth_invalid_element.innerHTML = error_message;
                    auth_invalid_element.className = '';
                  }
                } else {
                  auth_invalid_element.innerHTML = "Failed to authenticate email/password";
                  auth_invalid_element.className = '';
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
      validateFormFields();
    }
  };

  return signin;
})(SIGNIN || {});
