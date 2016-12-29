app.controller('loginctrl',['$rootScope','$scope','$http','$state',function($scope,$rootScope,$http,$state){
	$scope.user={
		username:"",
		password:""
	}
	
	$scope.login = function(){
		$http({
			method:"POST",
			url:$rootScope.apiend+'login',
			data:$scope.user
		})
		.success(function(result){
			// console.log(result[0]);
			// alert();
			if(result['statusCode']=='202')
			{
				localStorage.token=result['message'];
				if(result['userrole']=='1')
				{
					$state.go('dashboard');
				}
				else if(result['userrole']=='2')
				{
					$state.go('home');
				}
			}
			else
			{
				// $scope.error_msg=result['message'];
				// $rootScope.showerror=true;
			}
			// if($rootScope.goto == 'questionpage')
			// {
			// 	$state.go('askquestion');
			// }
		});
	};
}]);