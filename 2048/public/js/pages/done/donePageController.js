var app=angular.module("app.pages.done");

app.controller("donepageController",['player','$scope','$routeParams',function(player,$scope,$routeParams){

	player($routeParams.playerName).get().$promise.then(function(data){
		$scope.name=data.userName;
		$scope.highScore=data.scores;
		$scope.currScore=data.currentScore?data.currentScore:0;
	});
	

	
}])