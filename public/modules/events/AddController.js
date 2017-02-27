HATZA.controller('AddController', ['$scope', '$firebaseArray', '$location', 'FBURL', function($scope, $firebaseArray, $location, FBURL){

  $scope.addMarker = function() {
    var ref = new Firebase(FBURL).child("markers");
    var marker = $firebaseArray(ref);
    marker.$add({
        email: $scope.marker.email,
        coords:
        {
            latitude: $scope.marker.coords.latitude,
            longitude: $scope.marker.coords.longitude
        },
        modalWindow: 
        {
            title:$scope.marker.modalWindow.title 
        }     
    });
    $location.path('/events');
  };
  $scope.cancel = function() {    
      $location.path('/events');
  };
}]);