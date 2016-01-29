var REGISTER = (function (register) {
  register.submit = function () {
    console.log("submit");

    //var email_name = document.getElementById("email-input").value;
    //var url = "http://localhost:3000/api/users/email/" + email_name

    var url = base_url + "/api/user"
      , method = "POST"
      , async = true
      , ajax = new XMLHttpRequest();

    ajax.open(method, url, async);

    ajax.onreadystatechange = function() {
      console.log("here");
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          var status = ajax.status;

          console.log("status: ", status);
          console.log("response: ", ajax.responseText);

          return false;
        } else {
          console.log("status: ", ajax.status);
          return false;
        }
      }
    };

    ajax.send();
  };

  return register;
})(REGISTER || {});
