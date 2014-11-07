'use strict';

/* App Module */

var jobOfferApp = angular.module('jobOfferApp', [
  'ngRoute',
  'jobOfferControllers',
  'jobOfferServices',
  'jobOfferApp.templates',
  'jobOfferFilters'
]);

angular.module('jobOfferApp.templates', []);

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



function _js_debug(data) {
    var str = _js_dataToString(data,0);
    _debug(str);
}

function _js_dataToString(data,level) {
    var k;
    
    level++;
    var str = '';
    var einrueck = '';
    var i;
    for (i = 1; i < level * 5; i++) {
        einrueck += ' ';
    }
    if (typeof(data) == 'object') {
        for (k in data) {
            str += einrueck + k + ':' + _js_dataToString(data[k], level) + "\n";
        }
    } else {
        str = data;
    }
    return str;
}

function _debug(str) {
    if (window.console && console.log) {
        console.log(str);
    } else {


    }
}