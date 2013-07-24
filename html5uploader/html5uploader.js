angular.module('html5Uploader', []);

angular.module('html5Uploader').directive('ngHtml5Uploader', function(){

	var directive = {};

	directive.restrict = 'A';

	directive.scope = {
        extraFields : '=',
        callbacks   : '=',
        config      : '='
	};

	directive.link = function (scope, element, attrs) {
        //https://github.com/mihaild/jquery-html5-upload
        var existCallbacks = (typeof(scope.callbacks) ===  'object') ? true : false;

        if(typeof(scope.config) === 'object' && scope.config.url){
            $(element).html5_upload({
                url         : scope.config.url,
                extraFields : scope.extraFields || {},
                fieldName   : scope.config.fieldName || 'image',
                sendBoundary: window.FormData || $.browser.mozilla,
                setProgress : function(val) {
                    if(existCallbacks){
                        if(typeof(scope.callbacks.setProgress)==='function'){
                            scope.callbacks.setProgress(val);
                        }
                    }
                },
                onFinishOne : function(event, response, name, number, total) {
                    if(existCallbacks){
                        if(typeof(scope.callbacks.onFinishOne)==='function'){
                            scope.callbacks.onFinishOne(event, response, name, number, total);
                        }
                    }
                },
                onFinish    : function(event,total){
                    if(existCallbacks){
                        if(typeof(scope.callbacks.onFinish)==='function'){
                            scope.callbacks.onFinish(event,total);
                        }
                    }
                },
                onError     : function(event, name, error) {
                    if(existCallbacks){
                        if(typeof(scope.callbacks.onError)==='function'){
                            scope.callbacks.onError(event, name, error);
                        }
                    }
                }
            });
        }else{
            if(existCallbacks){
                if(typeof(scope.callbacks.onError)==='function'){
                    scope.callbacks.onError(null, null, "Invalid Configuration Url");
                }
            }
        }
    };

	return directive;
});