'use strict';


// Declare app level module which depends on filters, and services
var djApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']);

djApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'index.html', controller: MainCtrl});
    //$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
