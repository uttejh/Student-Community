app.controller('seperatequestion',['$scope','$rootScope','$http','$stateParams',function($scope,$rootScope,$http,$stateParams){
	$http({
		method:'GET',
		url : $rootScope.apiend + '/getquestions',
		params:{
			id:$stateParams.q_id
		}
	}).success(function(result){
		$scope.questions = result;
		console.log(result);
	});

	
}])