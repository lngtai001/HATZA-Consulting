HATZA.controller('ListController', ['$scope', '$firebaseArray', '$firebaseObject', 'FBURL', function($scope,$firebaseArray, $firebaseObject, FBURL){
  var markers = new Firebase(FBURL).child("markers");
  $scope.markers = $firebaseArray(markers);
    
  $scope.removeMarker = function(id) {
    var ref = new Firebase(FBURL).child("markers").child(id);
    var marker = $firebaseObject(ref);
    marker.$remove();
   };
}]);

