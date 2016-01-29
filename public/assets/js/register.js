var REGISTER = (function (register) {
  register.submit = function () {
    console.log("submit");

    var form = document.getElementById('form-personal');

    if (form.checkValidity()) {
      console.log("form valid");

      var user_data = {
        'data': {
          'first_name': form['firstName'].value,
          'last_name': form['lastName'].value,
          'email': form['email'].value,
          'password': form['password'].value
        }
      }
      , url = "http://localhost:3000/api/user"
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
                console.log("route to signin page");
                window.location.href = 'http://localhost:3000/signin'
              } else {
                if (data.error && data.error.message) {
                  console.error(data.error.message);
                  if (data.error.message === "") {

                  }
                } else {
                  console.error("Failed to register new user account");
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
      console.log("form not valid");
    }
  };

  return register;
})(REGISTER || {});
