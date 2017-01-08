app.controller('MainController',['$rootScope','$scope','$state','$http','$cookies',function($rootScope,$scope,$state,$http,$cookies){
	
	$rootScope.apiend = 'http://localhost:8012/uttejh/SCOM/back/public/';
	$scope.title="Home";
	$scope.$on("changeTitle",function(event,data){
		$scope.title=data;
	});
	var cookietoken = $cookies.get('scomToken');
	var userrole = $cookies.get('userrole');
	if(userrole == '1')
	{
		$rootScope.adminuser = true;
	}
	if(cookietoken == null){
		localStorage.removeItem('authscomtoken');
	}
	$rootScope.userprofilename = $cookies.get('userproname');

	$rootScope.signedin = false;
	if(cookietoken)
	{
		$rootScope.signedin = true;
	}
	else
	{
		$rootScope.signedin = false;
	}
	console.log($rootScope.signedin);

	
	var reg_array = [];

	$scope.register = {
		username:"",
		password:"",
		passwordConfirmation:"",
		email:""
	};

	$scope.registers = function(){
		$rootScope.showloader = true;
		$http({
			method:"POST",
			url:$rootScope.apiend+'register',
			data: $scope.register
		})
		.success(function(result){
			$rootScope.showloader = false;
			console.log(result);
			$scope.message=result[0];
			// $('#myModal').modal('show');
			//recieve localstorage.token
			$rootScope.signedin = true;
			localStorage.authscomtoken = result[1];
			$rootScope.userprofilename = result[2];
			$cookies.put('scomToken', result[1]);
			$cookies.put('userproname',result[2]);
			$cookies.put('userrole',2);
			$state.go('home');
		})
		.error(function(data){
			$rootScope.showloader = false;
			reg_array.length = 0;
			angular.forEach(data, function(value, key) {
			  // console.log(key + ': ' + value);
			reg_array.push('' + value);
			$scope.errors = reg_array;
			});
		})
	};
	// if(loginservice.sign == 'true')
	// {
	// 	alert('hello');
	// }

	$scope.user={
		username:"",
		password:""
	}
	$rootScope.showerror=false;
	$scope.login = function(){
		$rootScope.showloader=true;
		$http({
			method:"POST",
			url:$rootScope.apiend+'login',
			data:$scope.user
		})
		.success(function(result){

			// console.log(result[0]);
			// alert();
				console.log(result);

			if(result['statusCode']=='202')
			{
				if($scope.user.rememberme){
					var expireDate = new Date();
	  				expireDate.setDate(expireDate.getDate() + 30);
					$cookies.put('scomToken', result['message'],{'expires': expireDate});
					$cookies.put('userproname',result['name'],{'expires': expireDate});

				}
				else
				{
					$cookies.put('scomToken', result['message']);
					$cookies.put('userproname',result['name']);
					
				}


				$rootScope.signedin = true;
				localStorage.authscomtoken = result['message'];
				// $cookies.put('scomToken', result['message']);
				// $cookies.put('userproname',$scope.user.username);
				$rootScope.userprofilename = $cookies.get('userproname');
				$cookies.put('userrole',result['role']);
				if(result['role'] == '1')
				{
					$rootScope.adminuser = true;
				}
				// if(result['userrole']=='1')
				// {
				// 	// $state.go('dashboard');
				// }
				// else if(result['userrole']=='0')
				// {
				// 	$state.go('home');
				// }
				$rootScope.showloader=false;
				$state.go('home');
			}
			else
			{
				$rootScope.showloader=false;
				$scope.error_msg=result;
				console.log(result);
				$rootScope.showerror=true;
			}
		});
	};
	$scope.logout = function(){
		$rootScope.showloader=true;
		$rootScope.signedin = false;
		localStorage.removeItem('authscomtoken');
		$cookies.remove('scomToken');
		$cookies.remove('userproname');
		$cookies.remove('userrole');
		// $rootScope.showloader=false;
		$state.go('home');
		$rootScope.showloader=false;
	}
}]);

