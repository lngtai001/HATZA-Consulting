HATZA.controller('ClientsController', ['$scope', '$firebaseArray', '$firebaseObject', 'FBURL', function($scope,$firebaseArray, $firebaseObject, FBURL, firebaseUser){     
    //Retrieve users data from firebase db
    return firebase.database().ref('/user/' ).once('value').then(function(snapshot) {
    var user = snapshot.val(); 
    $scope.userOption = [];
    
    //extract username from retrieved data
    angular.forEach(user, function(user, uid){
        angular.forEach(user, function(user, key){
            if(key == "profile" ){
                 angular.forEach(user, function(user, key){
                    if(key == "name") {
                        console.log(JSON.stringify(user))
                        var temp = {
                            uid: uid,
                            user: user
                        };
                        //Add username and their unique id to the list
                        $scope.userOption.push(temp);
                        $scope.client_form.$setPristine();
                        $scope.$apply() ;
                    }
                 })
            }
        })
    })
    
    //Select a client
    $scope.selectClient = function(uid) {
        console.log("CC: USER: " + (uid.uid))
        HATZA.currentClient = uid.uid
        localStorage.setItem("currentClient",uid.uid);
    };
    
    })
}]);
