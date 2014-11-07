'use strict';

/* Controllers */

var jobOfferControllers = angular.module('jobOfferControllers', []);




/** Controler for joblist */
jobOfferControllers.controller('JobListCtrl', ['$scope', 'JobDataStore','JobSearch',
  function($scope,JobDataStore , JobSearch) {
       
       $scope.jobs = JobDataStore.getJobs();
       
       //persistnet filters and sorting:
       
       $scope.search = JobSearch.search;
       $scope.search_zip = JobSearch.search_zip;
       $scope.search_region = JobSearch.search_region;
       $scope.search_position = JobSearch.search_position;
       $scope.$watch('search', function(newValue, oldValue) {
                JobSearch.search = newValue;
              });
       $scope.$watch('search_zip', function(newValue, oldValue) {
                JobSearch.search_zip = newValue;
              });
       $scope.$watch('search_region', function(newValue, oldValue) {
                JobSearch.search_region = newValue;
              });
       $scope.$watch('search_position', function(newValue, oldValue) {
                JobSearch.search_position = newValue;
              });
       
       
       
       $scope.orderProp = JobSearch.orderProp;
       $scope.$watch('orderProp', function(newValue, oldValue) {
                JobSearch.orderProp = newValue;
              });
       
       
    
  }]);

/** Controler for detail view */
jobOfferControllers.controller('JobDetailCtrl', ['$scope', '$routeParams', 'JobDataStore',
  function($scope, $routeParams, JobDataStore) {
     $scope.job = JobDataStore.getJobDetails($routeParams.jobId);
  }]);
