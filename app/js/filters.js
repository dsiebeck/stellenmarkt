'use strict';

/* Filters */
var appFilters = angular.module('jobOfferFilters', []);

//Sanitize-filter
appFilters.filter('sanitize', ['$sce', 
          function($sce) {
              return function(htmlCode){
                return $sce.trustAsHtml(htmlCode);
              }
            }
        ]);

//zipcode-filter  
appFilters.filter('zipFilter',
        function(){
            return function(jobs,zip_code) {
                      //Create vars
            		var matching_jobs = [];		
             
            		//Check if input matches current zip
            		if(jobs && zip_code){		 	
             
            		 	//Loop through each region
            			for(var i = 0; i < jobs.length; i++){
            				if(jobs[i].zip.substr(0, zip_code.length) == zip_code){
            					matching_jobs.push(jobs[i]);
            				}
            			}
            			//Return matching jobs
            			return matching_jobs;
            		}
            		else{
            			return jobs;
            		}		  
                
                  
                  };
            }
    );
        
