HATZA.controller('EditController', ['$scope','$location', '$stateParams', '$firebaseObject', 'FBURL',   
    function($scope, $location, $stateParams, $firebaseObject, FBURL){

    var ref = new Firebase(FBURL).child("markers").child($stateParams.id);
    $scope.marker = $firebaseObject(ref);

    $scope.editMarker = function() {
        $scope.marker.$save({
            email: $scope.marker.email,coords:{
            latitude: $scope.marker.coords.latitude,
            longitude: $scope.marker.coords.longitude},
            modalWindow: {title:$scope.marker.modalWindow.title }     
        });
        $scope.edit_form.$setPristine();
        $scope.marker = {};
        $location.path('/');

    };
    
    $scope.cancel = function() {    
    $location.path('/events');
  };
  
  $scope.onFormSubmission  = function () {
      $location.path('/events');
  }

}]);