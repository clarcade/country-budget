window.country_budget = (function () {
  var country_budget = {};

  Object.defineProperty(country_budget, 'openAddItemDialog', {
    value: function () {
      console.log("called openAddItemDialog");
      document.getElementById("addItemDialog")
        .style.display = 'block';
    }
  });

  return country_budget;
}());
