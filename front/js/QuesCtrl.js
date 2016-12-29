app.controller('QuestionController',['$scope','$rootScope','$http','$stateParams' ,function($scope,$rootScope,$http,$stateParams){
	$rootScope.showloader=true;
	$http({
		method:'GET',
		url : $rootScope.apiend + '/getquestions',
		// params:{
		// 	id:$stateParams.q_id
		// }
	}).success(function(result){
		$scope.questions = result;
		$scope.last = result['total'];
		$rootScope.showloader=false;
		console.log(result);
	});
	

	// pagination

	// $scope.value = 1;
	// $scope.activeMenu=1;

	// $scope.beg = true;
	// $scope.myClass='disabled';
	// $scope.show=1;
	$scope.donttouch = true;
	$scope.disablelast = true;

	$scope.activeMenu = 1;
	$scope.value = 1;

	
	$scope.increment = function(){
		if($scope.activeMenu < ($scope.last/10))
		{
			if($scope.activeMenu>=3)
			{
				$scope.value++;
			}
			$scope.activeMenu++;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.decrement = function(){
		if($scope.activeMenu>1)
		{
			if($scope.activeMenu>3)
			{
				$scope.value--;
			}
			$scope.activeMenu--;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.first = function(){
		if($scope.activeMenu != 1)
		{
			$scope.activeMenu = 1;
			$scope.value = 1;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.lastp = function(){
		$scope.perfectval1 = parseInt($scope.last/10);

		$scope.stop1 = $scope.last/10; 

		if($scope.perfectval1<$scope.last/10)
		{
			$scope.stop1 = $scope.perfectval1 + 1;
			console.log($scope.stop1);
		}
		if($scope.activeMenu != $scope.stop1)
		{
			$scope.activeMenu = $scope.stop1;
			$scope.value = $scope.stop1 - 2;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.paginate = function(x){

		$scope.perfectval = parseInt($scope.last/10);
		$scope.stop = $scope.last/10; 
		if($scope.perfectval<$scope.last/10)
		{
			$scope.last = ($scope.perfectval + 1)*10;
			$scope.stop = $scope.perfectval + 1;
		}


		if(x <= $scope.last/10 )
		{
			$rootScope.showloader=true;
			$scope.activeMenu = x;
			if(x>2)
			{
				$scope.value = x - 2;
			}
			else if(x = 2)
			{
				$scope.value = 1;
			}
			console.log($scope.activeMenu);

			$http({
			method:'GET',
			url : $rootScope.apiend + '/getquestions',
			params:{
				value : $scope.activeMenu
			}
			}).success(function(result){
				$rootScope.showloader=false;
				$scope.questions = result;
				
				console.log(result);
			});
		}
	}


}]);
app.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});

app.controller('seperatequestion',['$scope','$rootScope','$http','$stateParams','$cookies',function($scope,$rootScope,$http,$stateParams,$cookies){
	$rootScope.showloader=true;
	var cookietoken = $cookies.get('scomToken');
	var nametoken = $cookies.get('userproname');
	$scope.num = 5;
	$scope.numone = [];
	$scope.numone = 5;
	for(var i=0;i<5;i++){
		$scope.numone[i] = 5;
	}


	$scope.tinymceOptions = { 
	    plugins: 'link image codesample',
	    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright  | codesample',

	  };

	$http({
		method:'GET',
		url : $rootScope.apiend + '/getquestiondet',
		params:{
			id:$stateParams.qid
		}
	}).success(function(result){
		$scope.question = result;
		if($scope.question.comments==0)
		{
			$scope.nocomments = true;
		}
		else{
			$scope.nocomments = false;
		}
		$scope.coms = result['comments'];
		$scope.comlen = $scope.coms.length;
		if($scope.comlen > 5){
			$scope.commentshigh = true;
		}
		else{
			$scope.commentshigh = false;
		}
		$rootScope.showloader=false;
		
		console.log(result);
	}).error(function(data){
		console.log(data);
		$rootScope.showloader=false;
	})
	$scope.addcomment = "";
	$scope.postcomment = function()
	{
		$rootScope.showloader=true;
		if(cookietoken)
		{
			$http({
				method:'POST',
				url : $rootScope.apiend + '/postcomment',
				data:{
					id:$stateParams.qid,
					comment:$scope.addcomment,
					
				},
				headers:{'JWT-AuthToken':localStorage.authscomtoken}
			}).success(function(result){
				if($scope.nocomments == true)
				{
					$scope.question.comments.splice(0, 1); 
				}
				
			 	$scope.arrayText = {
			 		comment:$scope.addcomment,
			 		commenter:{
			 			username:nametoken
			 		}
			 	}
			 	$scope.question.comments.push($scope.arrayText);
			    console.log($scope.question.comments);
			    $scope.addcomment = null;
			    $scope.comment = false;
			    $scope.nocomments = false;
			    $rootScope.showloader=false;
				console.log(result);
			}).error(function(data){
				$rootScope.showloader=false;
				alert('something is wrong!');
			});
		}
		else{
			$rootScope.showloader=false;
			alert('You need to login');
		}
	}
	$scope.addanscomment = "";
	$scope.postanscomment = function(ansid,addanscomment,index){
		// console.log(ansid.addanscomment);
		$rootScope.showloader=true;
		if(cookietoken)
		{
			$http({
				method:'POST',
				url : $rootScope.apiend + '/postanscomment',
				data:{
					id:$stateParams.qid,
					comment:addanscomment,
					ansid:ansid,
				},
				headers:{'JWT-AuthToken':localStorage.authscomtoken}
			}).success(function(result){
				// if($scope.anscomment == true)
				// {
				// 	$scope.question.comments.splice(0, 1); 
				// }
				// $scope.arrayText2 = {
			 // 		comment:$scope.addcomment,
			 // 		commenter:{
			 // 			username:nametoken
			 // 		}
			 // 	}
			 // 	$scope.question.comments.push($scope.arrayText2);
			    
			 //    $scope.addcomment = null;
			 //    $scope.comment = false;
			 //    $scope.nocomments = false;
			 	// $scope.anscomment = [];
			 	// $scope.anscomment[index] = false;
			 	$scope.addedanscomment=[];
			 	$scope.addedanscomment[index] = true;
			 	$rootScope.showloader=false;


				console.log(result);
			}).error(function(data){
				$rootScope.showloader=false;
				alert('something is wrong!');
			});
		}
		else{
			$rootScope.showloader=false;
			alert('You need to login');

		}
		
	}

	$scope.ans="";
	$scope.answer = function()
	{
		$rootScope.showloader=true;
		if(cookietoken)
		{
			$http({
				method:'POST',
				url : $rootScope.apiend + '/postanswer',
				data:{
					id:$stateParams.qid,
					answer:$scope.ans,
				},
				headers:{'JWT-AuthToken':localStorage.authscomtoken}
			}).success(function(result){
				$rootScope.showloader=false;
				console.log(result);
			}).error(function(result){
				$rootScope.showloader=false;
				alert('something is wrong!');
			})
		}
		else{
			$rootScope.showloader=false;
			alert('You need to login');
			$scope.loginnow = true;
		}
	}

	$scope.user={
		username:"",
		password:""
	}

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

				// $scope.loginnow = false;
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
				// if(result['userrole']=='1')
				// {
				// 	// $state.go('dashboard');
				// }
				// else if(result['userrole']=='0')
				// {
				// 	$state.go('home');
				// }
				// $state.go('home');
				$scope.user="";
				$rootScope.showloader=false;
			}
			else
			{
				$rootScope.showloader=false;
				$scope.error_msg=result;
				console.log(result);
				$rootScope.showerror=true;
			}
		}).error(function(data){
			$rootScope.showloader=false;
			alert('Something looks wrong!');
		})
		;

	};

	$scope.highcoms = function(){
		$scope.commentshigh =false;
		$scope.num = 1000;
	}

	// $scope.increaselimit = function(obj)
	// {
	// 	 if (obj) {
	// 	     obj += 10;
	// 	 }
	// 	 else {
	// 	  	 obj = 40;
	// 	 }
	// }
	
}]);


app.controller('taggedcontroller',['$scope','$rootScope','$http','$stateParams',function($scope,$rootScope,$http,$stateParams){
	$rootScope.showloader=true;
	$http({
		method:'GET',
		url : $rootScope.apiend + '/gettagquestions',
		params:{
			tag:$stateParams.tag
		}
	}).success(function(result){
		$scope.questions = result;
		$scope.last = result['total'];
		console.log(result);
		$rootScope.showloader=false;
	});
	$scope.tagtitle = $stateParams.tag;


	// pagination

	// $scope.value = 1;
	// $scope.activeMenu=1;

	// $scope.beg = true;
	// $scope.myClass='disabled';
	// $scope.show=1;
	$scope.donttouch = true;
	$scope.disablelast = true;

	$scope.activeMenu = 1;
	$scope.value = 1;

	
	$scope.increment = function(){
		if($scope.activeMenu < ($scope.last/10))
		{
			if($scope.activeMenu>=3)
			{
				$scope.value++;
			}
			$scope.activeMenu++;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.decrement = function(){
		if($scope.activeMenu>1)
		{
			if($scope.activeMenu>3)
			{
				$scope.value--;
			}
			$scope.activeMenu--;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.first = function(){
		if($scope.activeMenu != 1)
		{
			$scope.activeMenu = 1;
			$scope.value = 1;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.lastp = function(){
		$scope.perfectval1 = parseInt($scope.last/10);

		$scope.stop1 = $scope.last/10; 

		if($scope.perfectval1<$scope.last/10)
		{
			$scope.stop1 = $scope.perfectval1 + 1;
			console.log($scope.stop1);
		}
		if($scope.activeMenu != $scope.stop1)
		{
			$scope.activeMenu = $scope.stop1;
			$scope.value = $scope.stop1 - 2;
			$scope.paginate($scope.activeMenu);
		}
	}

	$scope.paginate = function(x){
		$rootScope.showloader=true;
		$scope.perfectval = parseInt($scope.last/10);
		$scope.stop = $scope.last/10; 
		if($scope.perfectval<$scope.last/10)
		{
			$scope.last = ($scope.perfectval + 1)*10;
			$scope.stop = $scope.perfectval + 1;
		}


		if(x <= $scope.last/10 )
		{
			$scope.activeMenu = x;
			if(x>2)
			{
				$scope.value = x - 2;
			}
			else if(x = 2)
			{
				$scope.value = 1;
			}
			console.log($scope.activeMenu);

			$http({
			method:'GET',
			url : $rootScope.apiend + '/gettagquestions',
			params:{
				value : $scope.activeMenu,
				tag:$stateParams.tag
			}
			}).success(function(result){
				$scope.questions = result;
				$rootScope.showloader=false;
				
				console.log(result);
			});
		}
	}


}])