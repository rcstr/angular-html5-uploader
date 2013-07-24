var app = angular.module('testApp', ['html5Uploader']);

app.controller('testCtrl', function ($scope) {

	$scope.progress = "0%";
	
	//Uploader
	$scope.uploader = {
		config : {
			'url' 		: 'http://uploaderexampletoi.herokuapp.com/image',
			'fieldName' : 'file'
		},
		extraFields : {
			//Just as use example
			'token' : "1237617263"
		},
		callbacks : {
			setProgress : function(val){
				console.log(val);
				$scope.progress = Math.ceil(val*100)+"%";
				$scope.$apply();
			},
			onError 	: function(event, name, error){
				alert(error);
			},
			onFinish 	: function(event, total){

			},
			onFinishOne : function(event, response, name, number, total){
				response = JSON.parse(response);
				$scope.response = response;
				$scope.$apply();
			}
		}
	}

});
