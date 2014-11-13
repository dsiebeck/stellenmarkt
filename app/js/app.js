'use strict';
/* App Module */
var jobOfferApp = angular.module('jobOfferApp', [
  'ngRoute',
  'jobOfferControllers',
  'jobOfferServices',
  'jobOfferApp.templates',
  'jobOfferFilters'
]);

//read portal-id and environment from script-tag (src=....js?portal?123)
var scriptParams = getScriptConfigParams();
var PortalId = (scriptParams['portal'])?scriptParams['portal']:'default';
var ENV = (scriptParams['env'])?scriptParams['env']:'production';
//and set it as application-constant
jobOfferApp.constant('PortalId',PortalId);
jobOfferApp.constant('ENV',ENV);

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


function getScriptConfigParams(){
    var scripts = document.getElementsByTagName('script');
    var myScript = scripts[ scripts.length - 1 ];
    var queryString = myScript.src.replace(/^[^\?]+\??/,'');
    return parseQuery( queryString );
}

function parseQuery ( query ) {
   var Params = new Object ();
   if ( ! query ) return Params; // return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) continue;
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}
