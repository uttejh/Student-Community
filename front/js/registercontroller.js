app.controller('registerctrl',['$rootScope','$scope','$http','$state',function($scope,$rootScope,$http,$state){
	$scope.register = {
		username:"",
		password:"",
		passwordConfirmation:"",
		email:""
	};

	$scope.registers = function(){
		$http({
			method:"POST",
			url:$rootScope.apiend+'register',
			data: $scope.register
		})
		.success(function(result){
			console.log(result);
			$scope.message=result[0];
			// $('#myModal').modal('show');
			//recieve localstorage.token
			localStorage.authtoken = result[1];
			$state.go('home');
		});
	};
}]);

