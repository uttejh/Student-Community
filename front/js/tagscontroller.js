app.controller('TagsController',['$scope','$rootScope','$http','$cookies',function($scope,$rootScope,$http,$cookies){
	$rootScope.showloader=true;
	$http({
		method:"GET",
		url:$rootScope.apiend+"gettags",
		headers:{'AuthToken':localStorage.authtoken},
	}).success(function(result){
		$scope.mydata = result;
		$scope.last = result['total'];
		$rootScope.showloader=false;
	})
	var cookietoken = $cookies.get('scomToken');

	$scope.data = {
		thetag : '',
		tagdesc:''
	}
	$scope.addtag = function(){
		// $scope.thetag = "";
		$rootScope.showloader=true;
		if(cookietoken)
		{
			$http({
				method:"POST",
				url:$rootScope.apiend+"addtag",
				headers:{'AuthToken':localStorage.authtoken},
				data:$scope.data
			}).success(function(result){
				console.log(result);
				$rootScope.showloader=false;
			}).error(function(data){
				$rootScope.showloader=false;
				alert('something is wrong!');
			})
		}
		else{
			$rootScope.showloader=false;
			alert('You need to login inorder to add any tag.')
		}
	}


	$scope.activeMenu = 1;
	$scope.value = 1;

	
	$scope.increment = function(){
		if($scope.activeMenu < ($scope.last/24))
		{
			if($scope.activeMenu>=3)
			{
				$scope.value++;
			}
			$scope.activeMenu++;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.decrement = function(){
		if($scope.activeMenu>1)
		{
			if($scope.activeMenu>3)
			{
				$scope.value--;
			}
			$scope.activeMenu--;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.first = function(){
		if($scope.activeMenu != 1)
		{
			$scope.activeMenu = 1;
			$scope.value = 1;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.lastp = function(){
		$scope.perfectval1 = parseInt($scope.last/24);

		$scope.stop1 = $scope.last/24; 

		if($scope.perfectval1<$scope.last/24)
		{
			$scope.stop1 = $scope.perfectval1 + 1;
			console.log($scope.stop1);
		}
		if($scope.activeMenu != $scope.stop1)
		{
			$scope.activeMenu = $scope.stop1;
			$scope.value = $scope.stop1 - 2;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.paginate = function(x){
		$rootScope.showloader=true;
		$scope.perfectval = parseInt($scope.last/24);
		$scope.stop = $scope.last/24; 
		if($scope.perfectval<$scope.last/24)
		{
			$scope.last = ($scope.perfectval + 1)*24;
			$scope.stop = $scope.perfectval + 1;
		}


		if(x <= $scope.last/24 )
		{
			$scope.activeMenu = x;
			if(x>2)
			{
				$scope.value = x - 2;
			}
			else if(x = 2)
			{
				$scope.value = 1;
			}
			console.log($scope.activeMenu);

			$http({
			method:'GET',
			url : $rootScope.apiend + 'gettags',
			params:{
				value : $scope.activeMenu
			}
			}).success(function(result){
				$scope.mydata = result;
				$rootScope.showloader=false;
				
				console.log(result);
			});
		}
	}

}])