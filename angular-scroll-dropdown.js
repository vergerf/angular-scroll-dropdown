/*
 * angular-scroll-dropdown
 *
 * display dropdown even in div who have overflow=[auto|hidden|scroll]
 *
 */

 (function() {

  'use strict';

// Directive which will be associate to the dropdown element
angular.module('angular-scroll-dropdown', ['ui.bootstrap'])
.directive('dropdownscroll', [function() {
  return {
    restrict: 'C',
    controller: function($scope, $element) {
      $scope.status = {
        isopen : false
      };
    },
    link: function (scope, elm, attrs) {
      var button = elm.find('.dropdown-toggle');
      var dropdown = elm.find('.dropdown-menu-scoll');
      var content = elm.find('.btn-group');

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
            dropdown.css('top', (dropdown.offset().top - scroll.scrollValue) + "px");
            if (dropdown.offset().top < scroll.top || dropdown.offset().top > scroll.bottom) {
              scope.status.isopen = false;
              scope.$digest();
            }
          }
        });
      },
    };
  }])
// Directive which will be associate to the overflow div element
.directive('contentscroll', function() {
  return {
    restrict: 'C',
    link: function(scope, elm, attr) {
      var raw = elm[0];
      var oldScrollTop = raw.scrollTop;

          // send message to children if scrolling
          elm.bind('scroll', function() {
            scope.$broadcast('contentScroll:scrolling', {top: elm.offset().top, bottom: (elm.offset().top + elm.height()), scrollValue : (raw.scrollTop - oldScrollTop)});
            oldScrollTop = raw.scrollTop;
          });
        },
      };
    });

})();
