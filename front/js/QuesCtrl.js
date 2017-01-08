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

app.controller('seperatequestion',['$scope','$rootScope','$http','$stateParams','$cookies','$state',function($scope,$rootScope,$http,$stateParams,$cookies,$state  ){
	if(typeof $stateParams.qid == 'undefined') {
		// console.log($stateParams.qid);
        $state.go('DiscussionForum');
    }
	$rootScope.showloader=true;
	var cookietoken = $cookies.get('scomToken');
	var nametoken = $cookies.get('userproname');
	$scope.num = 5;
	$scope.numone = [];
	$scope.numone = 5;
	for(var i=0;i<5;i++){
		$scope.numone[i] = 5;
	}
	$scope.myform ={
		title:'',
		body:''
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
		},
		headers:{'JWT-AuthToken':localStorage.authscomtoken}
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
		if(result['isanswered'] == 1){
			$scope.isans = true;
		}
		if(result['message']=='202'){
			$scope.qposer = true;
		}
		$scope.myform.title = angular.copy($scope.question.question);
		$scope.myform.body = angular.copy($scope.question.body);
	// 		else{
	// 			alert('something is wrong');
	// 		}
		
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
	$scope.answer = function(q_id)
	{
		// console.log(q_id);
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
				if(result['status']=='done'){
					// $state.go('question',{qid: q_id});
					// $state.reload();
					$state.go($state.current, {qid: q_id}, {reload: true});

				}
				else if(result['status'] == 'empty'){
					alert(result['message']);
				}
			}).error(function(result){
				$rootScope.showloader=false;
				alert('something is wrong!');
			})
		}
		else{
			$rootScope.showloader=false;
			alert('You need to login');
			// $scope.loginnow = true;
			$('#Modal').modal('show');
		}
	}

	
	

	// if(cookietoken)
	// {
	// 	$http({
	// 		method:'POST',
	// 		url : $rootScope.apiend + '/postanswer',
	// 		headers:{'JWT-AuthToken':localStorage.authscomtoken}
	// 	}).success(function(result)
	// 	{
	// 		if(result['message']='202'){
	// 			$scope.qposer = true;
	// 		}
	// 		else{
	// 			alert('something is wrong');
	// 		}

	// 	}).error(function(data){
	// 		alert('something is wrong');
	// 	})
	// }

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
				$('#Modal').modal('hide');
				cookietoken = $cookies.get('scomToken');
				$rootScope.showloader=false;
			}
			else
			{
				$rootScope.showloader=false;
				$scope.errormesg=result;
				console.log(result);
				$rootScope.showerror=true;
			}
		}).error(function(data){
			$rootScope.showloader=false;
			alert('Something looks wrong!');
		})
		;

	};
	// $scope.alertansclass = 'alert alert-info';


	$scope.highcoms = function(){
		$scope.commentshigh =false;
		$scope.num = 1000;
	}
	$scope.temp = [];
	$scope.correctanswer = function(id,qid,$index){
		// alert(id);
		$http({
			method:"POST",
			url:$rootScope.apiend+'markanswer',
			data:{id:id,qid:qid},
			headers:{'JWT-AuthToken':localStorage.authscomtoken}

		}).success(function(result){
			
			if(result == 'You are not permitted to mark the answer.')
			{
				alert(result);
			}
			else{
				$scope.isans=true;
				$scope.temp[$index] = true;
			}
		})
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

	$scope.editquestion = function(qid){
		// alert($scope.myform.body);
		$http({
			method:"POST",
			url:$rootScope.apiend+'editquestion',
			headers:{'JWT-AuthToken':localStorage.authscomtoken},
			data:{form:$scope.myform,id:qid}
		}).success(function(result){
			alert(result);
			// $('#myModal').close();
			$('#myModal').modal('toggle');
			console.log(result);
		}).error(function(data){
			alert('something is wrong!');
		})
		
	}

	$scope.deletequestion = function(qid){
		$http({
			method:"GET",
			url:$rootScope.apiend+'deletequestion',
			headers:{'JWT-AuthToken':localStorage.authscomtoken},
			params:{id:qid}
		}).success(function(result){
			alert(result);
		}).error(function(data){
			alert('something is wrong!');
		})
	}

	$scope.deleteanswer = function(qid,aid){
		$http({
			method:"GET",
			url:$rootScope.apiend+'deleteanswer',
			headers:{'JWT-AuthToken':localStorage.authscomtoken},
			params:{id:qid,aid:aid}
		}).success(function(result){
			alert(result);
		}).error(function(data){
			alert('something is wrong!');
		})
	}

	$scope.deleteqc = function(commentid){
		$http({
			method:"GET",
			url:$rootScope.apiend+'deletequestioncomment',
			headers:{'JWT-AuthToken':localStorage.authscomtoken},
			params:{cid:commentid}
		}).success(function(result){
			alert(result);
		}).error(function(data){
			alert('something is wrong!');
		})
	}

	$scope.deleteac = function(commentid){
		$http({
			method:"GET",
			url:$rootScope.apiend+'deleteanswercomment',
			headers:{'JWT-AuthToken':localStorage.authscomtoken},
			params:{cid:commentid}
		}).success(function(result){
			alert(result);
		}).error(function(data){
			alert('something is wrong!');
		})
	}
	
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
		if($scope.questions.questions.length == 0)
		{
			$scope.showemptyme = true;
		}
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