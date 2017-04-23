HATZA.controller('DocumentsController', ['$scope', '$firebaseArray', '$firebaseObject', 'FBURL', function($scope,$firebaseArray, $firebaseObject, FBURL){
    
    
    var ref = new Firebase(FBURL).child("documents").child(HATZA.user.uid );//this should give array of documents    
    $scope.FBUserdocuments = $firebaseArray(ref);
    
   
    
    $scope.uploadFile = function(files){
        //UNCOMMENT this function to continue
//        console.log("UPLOAD FILE");
//        var storageRef = firebase.storage().ref();//this should be getting the value we set in the index page
//        console.log("storageRef "+ storageRef)
//        var img = new Firebase(storageRef);
//        $scope.imgs = $firebaseArray(img);
//        if (files != null) {
//        var file = files[0];
//        if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
//            $timeout(function() {
//              var fileReader = new FileReader();
//              fileReader.readAsDataURL(file); // convert the image to data url. 
//              fileReader.onload = function(e) {
//                $timeout(function() {
//                  $scope.thumbnail.dataUrl = e.target.result; // Retrieve the image. <-- This 'e.target.result' is the data object we want to save
//                  $scope.imgs.$add({
//                    date: Firebase.ServerValue.TIMESTAMP,
//                    base64: fileLoadedEvent.target.result
//                  });
//                });
//              }
//            });
//        }
//        else{
//            console.log("IMAGE UPLOAD ISSUE");
//        }
//    }
    
     $scope.addDocument = function() {
        console.log("DC: TRYING TO ADD")
        $scope.FBUserdocuments.$add({
            name: $scope.document.name,
            locked: false,//$scope.document.locked,
            url: ""//$scope.document.url
        }, onComplete) 
      }; 
   
    
    //old but i like the fileExtension method
//        var img = new Firebase(FBURL+"images");
//        $scope.imgs = $firebaseArray(img);
//        var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png", ".docx", ".doc", ".pdf",".pptx",".ppt", ".xlsx", ".xls", ".txt"];
//                
//        var sFileName = $("#nameImg").val();
//        console.log("IMAGE NAME: " +sFileName);
//        if (sFileName.length > 0) {
//          var blnValid = false;
//          for (var j = 0; j < _validFileExtensions.length; j++) {
//            var sCurExtension = _validFileExtensions[j];
//            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
//              blnValid = true;
//              var filesSelected = $scope.inputImg;
//              if (filesSelected.length > 0) {
//                var fileToLoad = filesSelected[0];
//                var fileReader = new FileReader();
//
//                fileReader.onload = function(fileLoadedEvent) {
//                  var textAreaFileContents = $scope.input.img;
//
//
//                  $scope.imgs.$add({
//                    date: Firebase.ServerValue.TIMESTAMP,
//                    base64: fileLoadedEvent.target.result
//                  });
//                };
//
//                fileReader.readAsDataURL(fileToLoad);
//              }
//              break;
//            }
//          }
//
//          if (!blnValid) {
//            alert('File is not valid');
//            console.log("FILE not valid")
//            return false;
//          }
//        }

        return true;
    }
         
      
      var onComplete = function(error) {
        if (error) {
          console.log('Synchronization failed');
          window.alert("Changes have been saved");
        } else {
          console.log('Synchronization succeeded');
        }
      };
      
    $scope.cancel = function() {    
        $location.path('/events');
    };
}]);
