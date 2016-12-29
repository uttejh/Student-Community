app.controller('QuestionController',['$scope','$rootScope','$http',function($scope,$rootScope,$http){

	// $scope.maxSize = 5;
	// $scope.bigTotalItems = 180;
	// $scope.bigCurrentPage = 1;
	 // $scope.button_clicked = false;
  //   $scope.do_something = function() {
  //       alert("Clicked!");
  //       $scope.button_clicked = true;
  //       return false;
  //   }

	$scope.current=3;
	$scope.first = 0;

	$scope.value = 1;
	$scope.activeMenu=1;
	$scope.isnotDisabled=false;
	

	$scope.paginate = function(starting){
		$scope.start = (starting-1)*10;
		$scope.end = $scope.start + 9;
		// console.log($scope.start,$scope.end );
		// $scope.activeMenu = starting;
		// console.log($scope.activeMenu);
	};

	$scope.increment= function(){
		// if ($scope.value == 1) {
  //   		$scope.activeMenu++;

		// }else{
		// 	$scope.value++;
		// }
		
		$scope.activeMenu++;
		$scope.value++;
		console.log($scope.value);
		
		$scope.paginate($scope.value);
		// $(".li_paginate").removeClass("active");
	};

	$scope.decrement= function(){
		// $scope.current--;

		// if($scope.value==1)
		// {
		// 	$("#previous").addClass("disabled");
		// }
		$scope.activeMenu--;
		$scope.value--;
		// if($scope.value>0)
		// {
		// 	$scope.isnotDisabled=true;
		// }
		console.log($scope.value);
		

		// if($scope.activeMenu > 2){
		// 	if($scope.value>=1)
		// 	{
		// 		$scope.value--;
		// 	}
		// 	$scope.activeMenu--;
		// }
		$scope.paginate($scope.value);
		// $(".li_paginate").removeClass("active");
		// $(this).addClass("active");
	};

	$http({
		method:'GET',
		url : $rootScope.apiend + '/getquestions',
		params:{
			start:$scope.start,
			end:$scope.end
		}
	}).success(function(result){
		$scope.questions = result;
	});

}]);
app.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});
