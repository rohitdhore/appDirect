'use strict';

/**
 * @ngdoc directive
 * @name twitterApiappApp.directive:mySortable
 * @description
 * # mySortable
 */
angular.module('twitterApiappApp')
  .directive('my:sortable', function(expression, compiledElement){
    return function(linkElement){
        var scope = this;
        linkElement.sortable(
        {
            placeholder: "ui-state-highlight",
            opacity: 0.8,
            update: function(event, ui) {
                var model = scope.$tryEval(expression);
                var newModel = [];
                var items = [];
                linkElement.children().each(function() {
                    var item = $(this);
                    // get old item index
                    var oldIndex = item.attr("ng:repeat-index");
                    if(oldIndex) {
                        // new model in new order
                        newModel.push(model[oldIndex]);
                        // items in original order
                        items[oldIndex] = item;
                        // and remove
                        item.detach();
                    }
                });
                // restore original dom order, so angular does not get confused
                linkElement.append.apply(linkElement,items);

                // clear old list
                model.length = 0;
                // add elements in new order
                model.push.apply(model, newModel);

                // presto
                scope.$eval();

                // Notify event handler
                var onSortExpression = linkElement.attr("my:onsort");
                if(onSortExpression) {
                    scope.$tryEval(onSortExpression, linkElement);
                }
            }
        });
    };
});
