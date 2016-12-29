app.controller('QuestionController',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
	// $scope.todos = [];
	alert('sd');
	$http({
		method:'GET',
		url : $rootScope.apiend + '/getquestions'
		// url : 'http://localhost/uttejh/SCOM/back/public/getquestions'
	}).success(function(result){
		$scope.questions = result;
		console.log($scope.questions);
		console.log(result);
		// $scope.length=result.length;
		// alert($scope.length);
		// alert(result);
	});
	// $scope.totalItems = 64;
	// $scope.currentPage = 4;


app.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});
