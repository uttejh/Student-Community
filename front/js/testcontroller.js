// app.controller('QuestionController', function($scope) {
//   $scope.filteredTodos = [];
//   $scope.currentPage = 1;
//   $scope.numPerPage = 10;
//   $scope.maxSize = 5;
//   $scope.todos = [
// 			{
// 				"id": 1,
// 				"date": "12-Jan-2015",
// 				"cheque_no": 11111,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 2,
// 				"date": "22-February-2015",
// 				"cheque_no": 222222,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 3,
// 				"date": "14-March-2015",
// 				"cheque_no": 33333,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 4,
// 				"date": "16-April-2015",
// 				"cheque_no": 44444,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 5,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 6,
// 				"date": "22-February-2015",
// 				"cheque_no": 222222,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 7,
// 				"date": "14-March-2015",
// 				"cheque_no": 33333,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 8,
// 				"date": "16-April-2015",
// 				"cheque_no": 44444,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 9,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 10,
// 				"date": "22-February-2015",
// 				"cheque_no": 222222,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 11,
// 				"date": "14-March-2015",
// 				"cheque_no": 33333,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 12,
// 				"date": "16-April-2015",
// 				"cheque_no": 44444,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 13,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 14,
// 				"date": "22-February-2015",
// 				"cheque_no": 222222,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 15,
// 				"date": "14-March-2015",
// 				"cheque_no": 33333,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 16,
// 				"date": "16-April-2015",
// 				"cheque_no": 44444,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 17,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 18,
// 				"date": "22-February-2015",
// 				"cheque_no": 222222,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 19,
// 				"date": "14-March-2015",
// 				"cheque_no": 33333,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 20,
// 				"date": "16-April-2015",
// 				"cheque_no": 44444,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 21,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 22,
// 				"date": "22-February-2015",
// 				"cheque_no": 222222,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 23,
// 				"date": "14-March-2015",
// 				"cheque_no": 33333,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 24,
// 				"date": "16-April-2015",
// 				"cheque_no": 44444,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 25,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 26,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 27,
// 				"date": "22-February-2015",
// 				"cheque_no": 222222,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 28,
// 				"date": "14-March-2015",
// 				"cheque_no": 33333,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 29,
// 				"date": "16-April-2015",
// 				"cheque_no": 44444,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 30,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 31,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 32,
// 				"date": "22-February-2015",
// 				"cheque_no": 222222,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 33,
// 				"date": "14-March-2015",
// 				"cheque_no": 33333,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 34,
// 				"date": "16-April-2015",
// 				"cheque_no": 44444,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 35,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 36,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 37,
// 				"date": "22-February-2015",
// 				"cheque_no": 222222,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 38,
// 				"date": "14-March-2015",
// 				"cheque_no": 33333,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 39,
// 				"date": "16-April-2015",
// 				"cheque_no": 44444,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			},{
// 				"id": 40,
// 				"date": "30-May-2015",
// 				"cheque_no": 55555,
// 				"withdraw": 126.01,
// 				"deposit": 236.00,
// 				"balance": 953.00
// 			}
// 		];
		
//   $scope.$watch('currentPage + numPerPage', function() {
//     var begin = (($scope.currentPage - 1) * $scope.numPerPage),
//       end = begin + $scope.numPerPage;
//     $scope.filteredTodos = $scope.todos.slice(begin, end);
//   });
// });

