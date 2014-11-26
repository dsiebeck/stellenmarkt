'use strict';
/* App Module */
var jobOfferApp = angular.module('jobOfferApp', [
  'ngRoute',
  'jobOfferControllers',
  'jobOfferServices',
  'jobOfferApp.templates',
  'jobOfferFilters',
  'jobOfferConfig'
]);




//template-modul (only used for production-build): 
angular.module('jobOfferApp.templates', []);

//setup routes
jobOfferApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/jobs', {
        templateUrl: 'partials/jobs.html',
        controller: 'JobListCtrl'
      }).
      when('/jobs/:jobId', {
        templateUrl: 'partials/job-detail.html',
        controller: 'JobDetailCtrl'
      }).
      otherwise({
        redirectTo: '/jobs'
      });
  }]);

