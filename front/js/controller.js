// app.controller("MainController",function($scope){
// 	$scope.title="Home";
// 	// $scope.type="Papers";
// 	// $scope.value1="unchecked";
// 	// $scope.value2="unchecked";
// 	$scope.$on("changeTitle",function(event,data){
// 		$scope.title=data;
		
// 	});
// 	// $scope.$on("changeType",function(event,data){
// 	// 	$scope.type=data;
		
// 	// });
// 	// $scope.$on("changeState",function(event,data){
// 	// 	$scope.state=data;
		
// 	// });
// 	// $scope.$on("changeRadio1",function(event,data){
// 	// 	$scope.value1=data;		
// 	// });
// 	// $scope.$on("changeRadio2",function(event,data){
// 	// 	$scope.value2=data;
// 	// });
// });

app.controller("HomeController",function($scope,$state){
	$scope.$emit("changeTitle",$state.current.views.main.data.title);
	// $scope.$emit("changeType",$state.current.views.main.data.type);
	// $scope.$emit("changeState",$state.current.views.main.data.state);
	// $scope.$emit("changeRadio1",$state.current.views.main.data.value1);
	// $scope.$emit("changeRadio2",$state.current.views.main.data.value2);
});
