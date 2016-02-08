var app=angular.module("app.pages.game");
app.controller("gameController",['$scope','$routeParams','player',function($scope,$routeParams,player){

	$scope.dim=4;
	$scope.playerName=$routeParams.playerName;
	player($routeParams.playerName).get().$promise.then(function(data){
		$scope.highScore=data.scores;
	});
	
}]);