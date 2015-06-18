app.factory('CommonService', function() {
   var common_service = {};
   var page_info = {};

   common_service.getPageInfo = function() {
      return page_info;
   };

   common_service.setPageTitle = function (page_title) {
      page_info.page_title = page_title;
   };

   return common_service;
});
