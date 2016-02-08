var app=angular.module("app.core");
app.factory("player",function($resource){
	
	function resource(userName){
		return $resource("/game/"+userName);
	}
	
	return resource;
})