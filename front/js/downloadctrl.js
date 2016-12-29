app.controller('DownloadController',['$scope','$rootScope','$state','$http',function($scope,$rootScope,$state,$http){
	$http({
		method:"GET",
		url:$rootScope.apiend+'getnames',
		params:{
				data:'questionpaper'
		}

	}).success(function(result){
		$scope.list = result;
		console.log(result);
	});

	// $scope.getpapers = function(){
	// 	$scope.arr = [];
	// 	console.log(form);

	// 	//array of checked
	// 	if($scope.check == true)
	// 	{
	// 		alert('hello');
	// 	}

	// 	// $http({
	// 	// 	method:"GET",
	// 	// 	url:$rootScope.apiend+'getpapers',

	// 	// }).success(function(result){
	// 	// 	$scope.choosen = result;
	// 	// 	console.log(result);
	// 	// });
	// }
	// $scope.users=[
	// {id:1,name:'a'},
	// {id:2,name:'s'},
	// {id:3,name:'g'},
	// {id:4,name:'f'},
	// {id:5,name:'d'},

	// ]

	$scope.getlist = function(){
		$rootScope.showloader=true;
		$scope.list.length = 0;
		console.log($scope.type);
		$http({
			method:"GET",
			url:$rootScope.apiend+'getnames',
			params:{
				data:$scope.type
			}
		}).success(function(result){
			$scope.list = result;
			$rootScope.showloader=false;
			console.log(result);
		});
	}

	$scope.selected = [];

	$scope.exist = function(item){
		return $scope.selected.indexOf(item.name) > -1;
	}

	$scope.toggleSelection = function(item){
		var idx = $scope.selected.indexOf(item.name);
		if(idx>-1){
			$scope.selected.splice(idx,1);
		}
		else{
			$scope.selected.push(item.name);
		}
	}
	$scope.head="Question Papers";

	$scope.emptyme = function(){
		$scope.selected.length = null;
	}

	$scope.getpapers = function(){
		if(localStorage.authscomtoken){
			$rootScope.showloader=true;
		
			if($scope.selected.length == 0)
			{
				$scope.empty = false;
				alert('Choose any subject');
				$rootScope.showloader=false;

			}
			else
			{
				$http({
					method:"GET",
					url:$rootScope.apiend+'getpapers',
					params:{
						// sel:JSON.stringify($scope.selected) ,
						"sel[]":$scope.selected,
						type:$scope.type
					}
				}).success(function(result){
					console.log($scope.type);
					if($scope.type=="material"){
						$scope.head="Material";
						
					}else{
						$scope.head='Question Papers';
						
					}
					$scope.empty=true;
					$scope.choosen = result;
					$rootScope.showloader=false;
					console.log(result);
				});
				
			}
		}
		else{
			alert('Please login to download.');
			$state.go('login_register');
		}
	}
}])