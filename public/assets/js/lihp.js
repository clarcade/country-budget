var MAIN = (function (main) {
  main.init = function () {
    if (!main.HEADER) console.log("main.HEADER missing");
    main.HEADER.init();
    if (!main.ITEM) console.log("main.ITEM missing");
    main.ITEM.init();
    if (!main.ASSET) console.log("main.ASSET missing");
    main.ASSET.init();
    if (!main.REPORT) console.log("main.REPORT missing");
    main.REPORT.init();
  };

  main.signout = function () {
    var url = "http://localhost:3000/api/authenticate"
      , method = "DELETE"
      , async = true
      , ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
      if (ajax.readyState === 4) {
        var status = ajax.status;

        if (status === 200 || status === 500) {
          var response_text = ajax.responseText;

          try {
            var data = JSON.parse(response_text);

            if (data.success) {
              window.location.href = "http://localhost:3000/signin";
            } else {
              if (data.error && data.error.message) {
                console.error(data.error.message);
              } else {
                console.error("Failed to invalidate token");
              }
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    };

    ajax.open(method, url, async);
    ajax.send();
  };

  return main;
})(MAIN || {});
