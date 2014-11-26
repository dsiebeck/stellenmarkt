/*configuration service*/

var jobOfferConfig = angular.module('jobOfferConfig',[]);
//read portal-id and environment from script-tag (src=....js?portal?123)
var scriptParams = _getScriptConfigParams();
jobOfferConfig.value('scriptParams',scriptParams);

jobOfferConfig.factory('Configuration', ['$log','scriptParams',
  function($log,scriptParams){
    
    
    
    var config = {
            //store application base url:
            baseUrl:location.protocol+'//'+location.host+location.pathname+location.search,
            portalId : (scriptParams['portal'])?scriptParams['portal']:'default',
            ENV : (scriptParams['env'])?scriptParams['env']:'production',
            limitListing : (scriptParams['limit'])?scriptParams['limit']:'',
            imgsize : (scriptParams['imgsize'])?scriptParams['imgsize']:'',
            showSearch : (_isTrue(scriptParams['nosearch']))?false:true,
            showSort : (_isTrue(scriptParams['nosort']))?false:true
        };
    
    //_js_debug(config);
    
    return {
        
        get:function(key){
            if(angular.isUndefined(config[key])){
                $log.error('Config: no such key: '+key);
                return '';
            }
            return config[key];
        },
        getAll: function(){
            return config;   
        }
        
        };
    
    function _isTrue(param){
        return (param && param != '0' && param != 'false')
    }
  }
]);

function _getScriptConfigParams(){
        var scripts = document.getElementsByTagName('script');
        var myScript = scripts[ scripts.length - 1 ];
        var queryString = myScript.src.replace(/^[^\?]+\??/,'');
        return _parseQuery( queryString );
    }
    
    function _parseQuery ( query ) {
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