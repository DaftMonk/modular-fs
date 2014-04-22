'use strict';

describe('Directive: direct', function () {

  // load the directive's module and view
  beforeEach(module('ngApp'));
  beforeEach(module('components/direct/direct.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<direct></direct>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the direct directive');
  }));
});