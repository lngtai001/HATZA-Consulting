HATZA.controller('ProfileController', ['$scope', '$firebaseObject', 'FBURL', function($scope, $firebaseObject, FBURL){
    $scope.user_id = HATZA.user.uid
    console.log("PROFILE CONTROLLER "+HATZA.user.uid);   
    //Retrieve profile for the logged in user from firebase db
    var ref = new Firebase(FBURL).child("user").child($scope.user_id).child("profile");
    $scope.profile = $firebaseObject(ref);
    console.log($scope.profile);
    //When the user makes changes to their profile and clicks on 'save changes' this function saves the data to firebase db
    $scope.editProfile = function() {
        var ref = new Firebase(FBURL).child("user").child($scope.user_id);
        ref.child("profile").set({
                name: $scope.profile.name,
                email: $scope.profile.email,
                contactNumber: $scope.profile.contactNumber,
                gender: $scope.profile.gender,
                industry: $scope.profile.industry,
                profession: $scope.profile.profession,
                company: $scope.profile.company,
                location: $scope.profile.location
        }, onComplete) 
      };
      
      //upon completion of the editProfile function this function handles the response
      var onComplete = function(error) {
        if (error) {
          console.log('Synchronization failed');
          window.alert("Changes have been saved");
        } else {
          console.log('Synchronization succeeded');
        }
      };
}]);
