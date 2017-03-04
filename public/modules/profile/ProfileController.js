HATZA.controller('ProfileController', ['$scope', '$firebaseArray', '$firebaseObject', 'FBURL', function($scope,$firebaseArray, $firebaseObject, FBURL, firebaseUser){
    $scope.user_id = HATZA.user.uid
    console.log("PROFILE CONTROLLER "+HATZA.user.uid);      
    var ref = new Firebase(FBURL).child("profile").child($scope.user_id);
    
    $scope.profile = $firebaseObject(ref);
    console.log($scope.profile);
    $scope.editProfile = function() {    
        //search for a profile
        //if not found create a profile
        var ref = new Firebase(FBURL).child("profile");
        ref.child(HATZA.user.uid).set({
            name: $scope.profile.name,
            surname: $scope.profile.surname,
            company: $scope.profile.company,
            industry: $scope.profile.industry,
            contact: $scope.profile.contact,
            email: $scope.profile.email
        });
//        var profile = $firebaseArray(ref);
//        profile.$add({
//            name: $scope.profile.name,
//            surname: $scope.profile.surname,
//            company: $scope.profile.company,
//            industry: $scope.profile.industry,
//            contact: $scope.profile.contact,
//            email: $scope.profile.email,    
//            uid: HATZA.user.uid
//        });

      };
  $scope.cancel = function() {    
      $location.path('/events');
  };
}]);
