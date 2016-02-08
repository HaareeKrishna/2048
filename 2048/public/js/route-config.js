var app=angular.module("game");
app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when("/game/:playerName",{
		templateUrl:'js/pages/game/game.html',
		controller:'gameController'
	}).when("/",{
		templateUrl:'js/pages/startPage/template.html'

	}).when("/game/:playerName/done",{
		templateUrl:'js/pages/done/done.html',
		controller:'donepageController'

	});
}]);