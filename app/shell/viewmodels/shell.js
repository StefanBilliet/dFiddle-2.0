(function(define) {
  "use strict";

  define(["knockout", "knockoutrepeat"], function (ko, knockoutrepeat) {
    var ShellViewModel = function() {
      var self = this;

      self.SelectInputWithRepeatBinding = new List();
      self.SelectInputWithForeachBinding = new List();
      self.SelectInputWithOptionsBinding = new List();
      
      self.activate = function () {
        self.SelectInputWithRepeatBinding.Items([{ Key: "One", Text: "One" }, { Key: "Two", Text: "Two" }, { Key: "Three", Text: "Three" }]);
        self.SelectInputWithRepeatBinding.SelectedItemKey("Three");

        self.SelectInputWithForeachBinding.Items([{ Key: "One", Text: "One" }, { Key: "Two", Text: "Two" }, { Key: "Three", Text: "Three" }]);
        self.SelectInputWithForeachBinding.SelectedItemKey("Three");

        self.SelectInputWithOptionsBinding.Items([{ Key: "One", Text: "One" }, { Key: "Two", Text: "Two" }, { Key: "Three", Text: "Three" }]);
        self.SelectInputWithOptionsBinding.SelectedItemKey("Three");
      };

      return self;
    };

    var List = function() {
      var self = this;

      self.Items = ko.observableArray();
      self.SelectedItem = ko.observable({Key: "", Text: ""});
      self.SelectedItemKey = ko.computed({
        read: function () {
          if (!self.SelectedItem())
            return "";
          return self.SelectedItem().Key;
        },
        write: function(newValue) {
          if (newValue !== "") {
            self.SelectedItem(self.Items().filter(function (item) {
              return item.Key === newValue;
            })[0]);
          }
        }
      }).extend({notify: 'always'});

      return self;
    };

    return ShellViewModel;
  });
})(window.define)