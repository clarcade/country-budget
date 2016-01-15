var SIGNIN = (function (signin) {
  signin.submit = function () {
    console.log("submit");

    var form = document.getElementById("signin-form");

    if (form.checkValidity()) {

    } else {

    }
    var email_name = document.getElementById("email-input").value;
    var url = "http://localhost:3000/api/users/email/" + email_name
      , method = "HEAD"
      , async = true;

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
      if (ajax.readyState === 4) {
        var submit = true;
        var status = ajax.status;
        var email_span_elem = document.getElementById("email-availability");

        if (status === 200) { // Found a match
          email_span_elem.innerText = "Email is not available.";

          submit = false;
        }/* else if (status === 204) { // No matches found
          email_span_elem.innerText = "Email is available.";
        }*/ else {
          email_span_elem.innerText = "Still sorting stuff out.";
          submit = false;
        }

        return submit;
      }
    };

    ajax.open(method, url, async);
    ajax.send();

    // TODO: PREVENT SUBMIT FOR TESTING PURPOSES ONLY
    return false;
  };

  return signin;
})(SIGNIN || {});
