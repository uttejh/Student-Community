var app=angular.module("myapp",["ui.router",'ui.tinymce','ui.bootstrap','ngCookies','ngSanitize','ngAnimate']);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }]);

// app.
//   filter('htmlToPlaintext', function() {
//     return function(text) {
//       return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
//     };
//   }
// );


app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise("/home");

	$stateProvider.
		state('home',{
			url: '/home',
			views:{
				"main":{
					templateUrl:"partials/home.html",
					data:{title:'Home'},
					controller:'HomeController'
				}
			}
		})
		.state('getpapers',{
			url:'/getpapers',
			views:{
				"main":{
					templateUrl:"partials/getpapers.html",
					data: {title: "Download Papers"},
					controller:'DownloadController'
				}
			}
		})
		// .state('getpapers',{
		// 	url:'/getpapers',
		// 	views:{
		// 		"main":{
		// 			templateUrl:"partials/getpapers.html",
		// 			data: {
		// 			  	title: "Download Papers",
		// 			 	type: "Papers",
		// 			 	state: "sharePapers"
		// 			},
		// 			controller:'HomeController'
		// 		}
		// 	}
		// })
		// .state('getmaterial',{
		// 	url:'/getmaterial',
		// 	views:{
		// 		"main":{
		// 			templateUrl:"partials/getpapers.html",
		// 			data: {
		// 			  	title: "Download Material",
		// 			 	type: "Material",
		// 			 	state: "shareMaterial"
		// 			},
		// 			controller:'HomeController'
		// 		}
		// 	}
		// })
		.state('share',{
			url:'/share',
			views:{
				"main":{
					templateUrl:"partials/share.html",
					data:{title:'Share'},
					controller:'sharecontroller'
				}
			}
		})
		// .state("sharePapers",{
		// 	url:'/share',
		// 	views:{
		// 		"main":{
		// 			templateUrl:"partials/share.html",
		// 			data:{
		// 				title:'Share',
		// 				value1: "checked" 
		// 			},
		// 			controller:'HomeController'
		// 		}
		// 	}
		// })
		// .state("shareMaterial",{
		// 	url:'/share',
		// 	views:{
		// 		"main":{
		// 			templateUrl:"partials/share.html",
		// 			data:{
		// 				title:'Share',
		// 				value2: "checked" 
		// 			},
		// 			controller:'HomeController'
		// 		}
		// 	}
		// })
		.state('tags',{
			url:'/tags',
			views:{
				"main":{
					templateUrl:"partials/tags.html",
					data:{title:'Tags'},
					controller:'TagsController'
				}
			}
		})
		.state('DiscussionForum',{
			url:'/DiscussionForum',
			views:{
				"main":{
					templateUrl:"partials/discussionforum.html",
					data:{title:'Discussion Forum'},
					controller:'HomeController'
				}
			}
		})
		.state('tagged',{
			url:'/tagged/:tag',
			views:{
				"main":{
					templateUrl:"partials/tagged.html",
					data:{title:'Tag'},
					controller:'taggedcontroller'
				}
			}
		})
		.state('askquestion',{
			url:"/askquestion",
			views:{
				"main":{
					templateUrl:"partials/askq.html",
					data:{title:'Ask Question'},
					controller:'HomeController'
				}
			}
		})
		.state('profile',{
			url:"/profile",
			views:{
				"main":{
					templateUrl:"partials/profile.html",
					data:{title:'My Profile'},
					controller:'ProfileController'
				}
			}
		})
		.state('question',{
			url:"/question/:qid", ///:qid
			views:{
				"main":{
					templateUrl:"partials/question.html",
					// data:{title:'Ask Question'},
					controller:'seperatequestion',
					// params: {qid: null},
					// onEnter: function ($state, $stateParams, $cookies) {
				 //      console.log($stateParams.qid);
				 //      if (!$stateParams.qid) {
				 //        // $stateParams.restaurantId = $cookies.restaurantId;
				 //        $state.go('DiscussionForum');
				 //      }
				 //    },
				}
			}
		})
		.state('login_register',{
			url:"/login_register",
			views:{
				"main":{
					templateUrl:"partials/log_reg.html",
					data:{title:'Login or Register'},
					controller:'MainController'
				}
			}
		});
		// state('home.main',{
		// 	url: '/home',
		// 	views:{
		// 		"content":{
		// 			templateUrl:"partials/home/main.html",
		// 			data:{title:'Home'},
		// 			controller:'HomeController'
		// 		}
		// 	}
		// });
});

app.service('Logging',['$state','$rootScope',function($state,$rootScope){
	this.logout() = function(){
		localStorage.removeItem('authtoken');
		$state.go('home');
	};
}]);