'use strict';

describe('Directive: mySortable', function () {

  // load the directive's module
  beforeEach(module('twitterApiappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-sortable></my-sortable>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mySortable directive');
  }));
});
