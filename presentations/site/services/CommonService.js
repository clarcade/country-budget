app.factory('CommonService', function() {
   var common_service = {};
   common_service.page_info = {};

   common_service.setPageTitle = function (page_title) {
      common_service.page_info.page_title = page_title;
   };

   common_service.getPageInfo = function() {
      return common_service.page_info;
   };

   return common_service;
});
