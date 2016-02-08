var app=angular.module("app.components.grid");

app.directive("getGrid",function($document){
	return{
		link:link,
		controllerAs:"GridController",
		controller:"gridController",
		templateUrl:"js/components/grid/template.html"

	
	}

	function link(scope,elem,attr){
	
		$document[0].onkeydown = checkKey;

		function checkKey(e) {
				scope.checkGameStatus();
		    e = e || window.event;
		    if (e.keyCode == '38') {
		     scope.up();
		    }
		    else if (e.keyCode == '40') {
		      scope.down();
		    }
		    else if (e.keyCode == '37') {
		 			scope.left();
		     
		    }
		    else if (e.keyCode == '39') {
		     scope.right();
		          }

			}
		}
});