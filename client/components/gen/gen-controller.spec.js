'use strict';

describe('Controller: GenCtrl', function () {

  // load the controller's module
  beforeEach(module('ngApp'));

  var GenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GenCtrl = $controller('GenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
