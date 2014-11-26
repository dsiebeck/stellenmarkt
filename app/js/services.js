'use strict';

/* Services */

var jobOfferServices = angular.module('jobOfferServices', ['ngResource']);

/**
API Ressource Services
*/
jobOfferServices.factory('JobListApi', ['$resource','Configuration',
  function($resource,Configuration){
    
    var apiUrl = (Configuration.get('ENV')=='dev')?'data/joblist.json':'http://master.medxmedia.de/json/index/flatten/true/';
    apiUrl += '?portal='+Configuration.get('portalId');
    var limit = parseInt(Configuration.get('limitListing'));
    if(limit){
         apiUrl += '&limit='+limit;
    }
    return $resource(apiUrl, {}, {
      load: {method:'GET', params:{}, isArray:true}
    });
  }
]);
  
jobOfferServices.factory('JobDetailApi', ['$resource','Configuration',
  function($resource, Configuration){
        var apiUrl = (Configuration.get('ENV')=='dev')?'data/job-:jobId.json':'http://master.medxmedia.de/job/view/format/json/id/:jobId';
        return $resource(apiUrl, {}, {
    });
  }
]); 

/**
Datastore Services
*/
jobOfferServices.factory('JobDataStore', ['JobListApi', 'JobDetailApi',
    function(JobListApi,JobDetailApi){
                
        return {
            _jobList:null,
            _jobDetails: {},
            
            getJobs: function(){
                if(!this._jobList){
                    this._jobList =  JobListApi.load();  
                }
                return this._jobList;
            },
            
            getJobDetails: function(jobId){
                
                if(!this._jobDetails[jobId]){
                    this._jobDetails[jobId] =  JobDetailApi.get({jobId:jobId});
                }
                return this._jobDetails[jobId];   
            }    
        };
    }
]);

//search values
jobOfferServices.factory('JobSearch',function(){
    return {
        search: '',
        search_zip: '',
        search_region: '',
        search_position : '',
        orderProp : '-firstpublished'
    }    
});
  
  