app.controller('ProfileController',['$scope','$rootScope','$state','$http',function($scope,$rootScope,$state,$http){

	$http({
		method:"GET",
		url:$rootScope.apiend+'getuserquestions',
		// params:{
		// 	id
		// }
		headers:{'AuthToken':localStorage.authscomtoken},
	}).success(function(result){
		console.log(result);
		$scope.uq = result;
		// console.log($scope.uq.questions.length);
		if($scope.uq.questions.length == 0){
			$scope.newnempty = true;
		}
	}).error(function(data){
		alert('Something is wrong!');
	})

	$scope.myform = {
		current :'',
		new:'',
		confirm:''
	}

	$scope.changepass = function(){
		$rootScope.showloader = true;
		$http({
			method:"POST",
			url:$rootScope.apiend+'changepass',
			data:$scope.myform,
			headers:{'AuthToken':localStorage.authscomtoken},
		}).success(function(result){
			// console.log(result);
			$scope.msg=true;
			$scope.errormsg = result;
			$rootScope.showloader = false;
		}).error(function(data){
			alert('Something is wrong!');
		})
	}


}])