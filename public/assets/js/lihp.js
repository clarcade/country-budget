var MAIN = (function (main) {
  main.init = function () {
    if (!main.HEADER) console.log("main.HEADER missing");
    main.HEADER.init();
    if (!main.ITEM) console.log("main.ITEM missing");
    main.ITEM.init();
    if (!main.REPORT) console.log("main.REPORT missing");
    main.REPORT.init();
  };

  return main;
})(MAIN || {});
