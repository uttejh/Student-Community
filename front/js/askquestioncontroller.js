app.controller('askquestioncontroller',['$scope','$state','$rootScope','$http',function($scope,$state,$rootScope,$http){
	if(localStorage.authscomtoken)
	{
		$scope.formdata = {
			title :"",
			tinymceModel:"",
			tags:"",
			text:""
		};


		$scope.quessave = function(){
			$rootScope.showloader=true;
			console.log($scope.formdata);
			// var array = new Array();
			// array = $scope.formadata.tags.split(',');
			// console.log(array);
			$http({
				method:"POST",
				url:$rootScope.apiend + '/askquestion',
				data:$scope.formdata,
				headers:{'AuthToken':localStorage.authscomtoken},
			})
			.success(function(result){
				$rootScope.showloader=false;
				$state.go('DiscussionForum');
				console.log(result);
			}).error(function(data){
				$rootScope.showloader=false;
				alert('something is wrong!');
			})
		}    
	}    
	else
	{
		// $rootScope.msg = 'Please login to proceed further';
		// $rootScope.goto = 'questionpage';
		alert('Please login to ask a question.');
		$state.go('login_register');
		
	}
}]);