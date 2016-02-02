var SIGNIN = (function (signin) {
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
                // save token to session... either that or it's already saved in a cookie
                window.location.href = "http://localhost:3000/lihp";
              } else {
                // TODO
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
    }
  };

  return signin;
})(SIGNIN || {});
