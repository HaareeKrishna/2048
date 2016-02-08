var app=angular.module("app.components.grid");
app.controller("gridController",function($scope,$window){
	$scope.numbers=['2,4'];
	$scope.dim=4;
	$scope.grid= createGrid($scope.dim);
	$scope.left=left;
	$scope.down=down;
	$scope.up=up;
	$scope.right=right;
	$scope.currScore=0;
	$scope.gameStatus=true;
	$scope.checkGameStatus=checkGameStatus;
	
	function createGrid(dim){
		var grid=math.zeros($scope.dim,$scope.dim);
		grid._data[0]=getRandomInit(grid._data[0]);
		return grid;
	}
	function down(){
		for(var i=0;i<=$scope.dim-1;i++){
			var line=[].concat.apply([],math.subset($scope.grid,math.index(math.range(0,$scope.dim),i))._data);
			var temp=updateLineReverse(line,0);
			var stack=[];
			temp.forEach(function(val,index){
				stack.push([val]);
			});
			$scope.grid.subset(math.index(math.range(0,$scope.dim),i),stack);
		
		}
		$scope.$apply();
		var Lastline=$scope.grid._data;
		Lastline[0]=getRandomInit(Lastline[0]);
	}
	function up(){
	
		for(var i=0;i<=$scope.dim-1;i++){
			var line=[].concat.apply([],math.subset($scope.grid,math.index(math.range(0,$scope.dim),i))._data);
			var temp=updateLine(line,1);
			var stack=[];
			temp.forEach(function(val,index){
				stack.push([val]);
			});
			$scope.grid.subset(math.index(math.range(0,$scope.dim),i),stack);
		}
		$scope.$apply();
		var Lastline=$scope.grid._data;
		Lastline[Lastline.length-1]=getRandomInit(Lastline[Lastline.length-1]);
		
}



	function right(){
	
		var stack=[];
		for(var i=0;i<$scope.grid._data.length;i++){
			stack.push(updateLine($scope.grid._data[i],0));
		}

		$scope.grid=math.matrix(stack);
		$scope.$apply();
		var Lastline=[].concat.apply([],math.subset($scope.grid,math.index(math.range(0,$scope.dim),0))._data);
		$scope.grid.subset(math.index(math.range(0,$scope.dim),0),getRandomInit(Lastline));
		$scope.$apply();
		
	}


	function left(){
		var stack=[];
		for(var i=0;i<$scope.grid._data.length;i++){
			stack.push(updateLineReverse($scope.grid._data[i],1));
		}

		$scope.grid=math.matrix(stack);
		$scope.$apply();
		var Lastline=[].concat.apply([],math.subset($scope.grid,math.index(math.range(0,$scope.dim),$scope.grid._data.length-1))._data);
		$scope.grid.subset(math.index(math.range(0,4),$scope.grid._data.length-1),getRandomInit(Lastline));
		$scope.$apply();
	}
	
	function updateLine(line,reverse){

		line=scliceZeros(line,reverse);
		var newLine;
		line.every(function(val,index){
			if(index!=line.length-1){ 
				if(val!=0 && line[index]==line[index+1]){
					var end=index+2>line.length?index:index+2;
					line[index]+=line[index+1];
					$scope.currScore+=line[index];
					var start=line.slice(0,index+1);
					var sliced=line.slice(end);
					if(reverse){
						var r=sliced.concat([0]);
						newLine=start.concat(r);
					}
					else{
						var temp=[0].concat(start);
						newLine=temp.concat(sliced);
				
					}
					return false;
				}
				else {
					
					return true;
				}
			}
			else newLine=line;

		});
		return newLine;

	};;

	function updateLineReverse(line,reverse){
		line=scliceZeros(line,reverse);
		var flag=true;
		newLine=line;
		for(var index=line.length-1;index>0&&flag==true;index--){
				if(line[index]!=0 && line[index]==line[index-1]){
					var end=index;
					line[index]+=line[index-1];
					$scope.currScore+=line[index];
					var start=line.slice(0,index-1);
					var sliced=line.slice(end);
					if(reverse){
						var temp=sliced.concat([0]);
						newLine=start.concat(temp);
					}
					else{
						var temp=[0].concat(start);
						newLine=temp.concat(sliced);
					}

					flag=false;
				}
				else {
					
					flag= true;
				}

			}
		return newLine;

	};
	function checkGameStatus(){
		var flag=true;
		
		$scope.grid._data.every(function(val,index){
			if(val.indexOf(2048)>-1){
				$window.location="/game/"+$scope.playerName+"/score?score="+$scope.currScore;
			}
		})
	}
	function scliceZeros(line,reverse){
		var temp=[];
		for(var i=0;i<line.length;){
			if(line[i]==0){
				line.splice(i,1);
				temp.push(0);
				
			}else
				i++;
		};
		if(reverse) 
			line=line.concat(temp);
		else line =temp.concat(line);
		return line;
	}
	
	function getRamdomArray(len){
		var arr=[];
		for(var i=0;i<len;i){
			var rand=Math.floor(Math.random() * len);
			if(arr.indexOf(rand)==-1){
				arr[i]=rand;
				i++;
			}
			
		}
		return arr;
	}
	function getRandomInit(line){
		var num=[2,4];
		var temp=getRamdomArray(4);
		temp.every(function(val,index){
			if(line[val]==0){
				line[val]=num[Math.floor(Math.random() * num.length)];
				return false;
			}
			else return true;
		});
		return line;
	}
	
})
