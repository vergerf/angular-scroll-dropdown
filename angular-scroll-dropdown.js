/*
 * angular-scroll-dropdown
 *
 * display dropdown even in div who have overflow=[auto|hidden|scroll]
 *
 */

 (function() {

  'use strict';

  angular.module('angular-scroll-dropdown', ['ui.bootstrap'])
  .directive('dropdownscroll', [function() {
    return {
      restrict: 'C',
      link: function (scope, elm) {
        var button = elm.find('.dropdown-toggle');
        var dropdown = elm.find('.dropdown-menu-scoll');

        // change dropdown position if click on button
        button.bind('click', function() {
          var dropDownTopInBottom = button.offset().top + button.outerHeight();
          var dropDownTopInTop = button.offset().top;

          if ($(window).height() < (dropDownTopInBottom + dropdown.height())) {
            dropdown.css('top', (dropDownTopInTop - dropdown.height()) + "px");
          } else {
            dropdown.css('top', dropDownTopInBottom + "px");
          }
          dropdown.css('left', button.offset().left + "px");
        });

        // parent is scrolling => updates the position  of the active dropdown (if there is one)
        scope.$on('contentScroll:scrolling', function (event, scroll) {
          var dropdown = elm.find('.dropdown-menu-scoll:visible');
          if (dropdown.length !== 0) {

            var dropDownTopInBottom = button.offset().top + button.outerHeight();
            var dropDownTopInTop = button.offset().top;

            if ($(window).height() < (dropDownTopInBottom + dropdown.height())) {
              dropdown.css('top', (dropDownTopInTop - dropdown.outerHeight()) + "px");
            } else {
              dropdown.css('top', dropDownTopInBottom + "px");
            }
            dropdown.css('left', button.offset().left + "px");

            if (dropDownTopInTop < scroll.top || dropDownTopInBottom > scroll.bottom) {
              button.click();
            }
          }
        });
      },
    };
  }])
.directive('contentscroll', function() {
  return {
    restrict: 'C',
    link: function(scope, elm) {
          // send message to children if scrolling
          elm.bind('scroll', function() {
            scope.$broadcast('contentScroll:scrolling',
            {
              top: elm.offset().top,
              bottom: (elm.offset().top + elm.height()),
            });
          });
        },
      };
    });

})();
