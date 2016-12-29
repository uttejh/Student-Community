app.controller('TinyMceController', function($scope) {
  $scope.tinymceModel = '';
  $scope.placeholder="hi";
  // tinymce.init({
  //   codesample_dialog_height:100
  // });

  $scope.getContent = function() {
    console.log('Editor content:', $scope.tinymceModel);
  };

  $scope.setContent = function() {
    $scope.tinymceModel = 'Time: ' + (new Date());
  };

  $scope.tinymceOptions = { 
    plugins: 'link image codesample',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright  | codesample',

  };
});
