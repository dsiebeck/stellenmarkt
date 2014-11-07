'use strict';

/* Services */

var jobOfferServices = angular.module('jobOfferServices', ['ngResource']);

/**
API Ressource Services
*/
jobOfferServices.factory('JobListApi', ['$resource',
  function($resource){
    return $resource('data/joblist.json', {}, {
      load: {method:'GET', params:{}, isArray:true}
    });
  }
]);
  
jobOfferServices.factory('JobDetailApi', ['$resource',
  function($resource){
    return $resource('data/job-:jobId.json', {}, {
      
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
  
  