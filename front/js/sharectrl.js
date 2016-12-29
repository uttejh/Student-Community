app.controller('sharecontroller',['$scope','$rootScope','$http','$state',function($scope,$rootScope,$http,$state){
	$scope.imageUpload = function(element){
	    var reader = new FileReader();
	    // reader.onload = $scope.imageIsLoaded;
	    reader.readAsDataURL(element.files[0]);
	}

	$scope.submit = function(dat){
		$rootScope.showloader=true;
		var formdata = new FormData();
		formdata.append('file', dat.filedat);
		formdata.append('name', dat.name);
		formdata.append('year', dat.year);
		formdata.append('branch', dat.branch);
		formdata.append('rad', dat.rad);
		// formdata.append('mat', dat.mat);


		$http({
			method:"POST",
			url:$rootScope.apiend+'uploadpost',
			data:formdata,
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined,
				// 'JWT-AuthToken':localStorage.token
			}
		}).success(function(result){
			console.log(result);
			$rootScope.showloader=false;
			
		}).error(function(data){
			$rootScope.showloader=false;
			alert("something's wrong!");
		})
	}

	
}])