HATZA.controller('ClientDocumentsController', ['$scope', '$window', '$firebaseArray', '$firebaseObject', 'FBURL', function($scope, $window, $firebaseArray, $firebaseObject, FBURL, firebaseUser){
    var localReferenceFile = null;
    
    $scope.downloadDocumentUploaded = function(){
        $scope.downloadDocument(localReferenceFile)
    }
    
     $scope.deleteDocument = function(referenceFileUID, referenceFileURL, referenceFileName){
        console.log("CDC: DELETE DOCUMENT: \nNAME:"+ referenceFileName + "\nURL:" + referenceFileURL);
        
        //delete from storage
        var fileDownloadRef = firebase.storage().ref('documents/' +HATZA.currentClient+"/"+ referenceFileURL)
        // Delete the file
        fileDownloadRef.delete().then(function() {
          console.log("CDC: DELETE SUCCESS STORAGE: ")// File deleted successfully
          deleteFileFromDB(referenceFileUID)
        }).catch(function(error) {
           console.log("CDC: DELETE FAILED FOR STORAGE: " +error)
        });
    }
    
    var deleteFileFromDB = function(referenceFileUID){
        var documentRef =  firebase.database().ref('/documents/'+HATZA.currentClient+"/"+ referenceFileUID)
        documentRef.remove(function (error) {
            if (!error) {
                console.log("CDC: DELETE SUCCESS DB: ")
                setCurrentClientDocuments(HATZA.currentClient)
            }
            else{
                 console.log("CDC: DELETE FAILED FOR DB: " +error)// Uh-oh, an error occurred!
            }
        })
    }
    
    $scope.downloadDocument = function(referenceFile){
        console.log("CDC: DOWNLOAD DOC: ")
        console.log("CDC: REF FILE: " +referenceFile)
        //$window.open(localReferenceFile, '_blank');
        
        var fileDownloadRef = firebase.storage().ref('documents/' +HATZA.currentClient+"/"+ referenceFile);
        fileDownloadRef.getDownloadURL().then(function(referenceURL) {
            console.log("CDC: URL: " + referenceURL);
            $window.open(referenceURL, '_blank');
          // Insert url into an <img> tag to "download"
        }).catch(function(error) {
           console.log("CDC: DOWNLOAD FILE FAILED: "+error)
        });
    }
    
    var onCompleteDocumentUploadStorage = function(error) {
        if (error) {
          console.log('CDC: UPLOAD FAILED' + error);
          $scope.fileUploadStatus = "UPLOAD FAILED"
          $scope.files = null;
        } else {
          console.log('CDC: UPLOAD SUCCESS');
          $scope.fileUploadStatus = "File READY, Please enter the filename and add document"
          $scope.$apply()
          $scope.files = null;
          //$window.open(localReferenceFile, '_blank');
        }
    };
    
    var documentUploadStorage = function(files){ //local access only
        //UNCOMMENT this function to continue
        console.log("UPLOAD FILE");
        var storageRef = firebase.storage().ref(('documents/' +HATZA.currentClient+"/"+ files[0].name));//this should be getting the value we set in the index page
        console.log("storageRef "+ storageRef)
        $scope.fileUploadStatus = "UPLOADING file, Please wait ...  ";
        $scope.$apply() ;
        storageRef.put(files[0]).then(function(snapshot) {
            $scope.fileUploadStatus = "UPLOAD PROCESSING";
            console.log('Uploaded a blob or file!');
            storageRef.getDownloadURL().then(function(result){
            console.log("CDC: uploaded: " +result);
            localReferenceFile = files[0].name;
        }, onCompleteDocumentUploadStorage());
   })
    }
    $scope.filename = "";
    $scope.uploadDocument = function(element){ //accessible by html
        $scope.files = element.files 
        console.log($scope.files)
        console.log("CDC: UPLOAD: "+$scope.filename);
        documentUploadStorage($scope.files);
    }
    
    
    var onCompleteDocumentUploadDB = function(error) {
        if (error) {
          console.log('CDC: TRANSACTION FAILED');
          $scope.fileUploadStatus = "UPLOAD FAILED"
          $scope.files = null;
        } else {
          console.log('CDC: TRANSACTION SUCCESS');
          $scope.fileUploadStatus = "UPLOAD SUCCESS"
          $scope.files = null;
          setCurrentClientDocuments(HATZA.currentClient)
          //$window.open(localReferenceFile, '_blank');
        }
    };
    $scope.documentUploadDB = function(){
        console.log("CDC: ADD DOC TO USER\nFILE NAME:" +$scope.filename +"\nURL: " +localReferenceFile+ "\nUSER: "+HATZA.currentClient)
        if(HATZA.currentClient!=null && localReferenceFile !=null && localReferenceFile !="" && $scope.filename!=""){
            var documentRef =  firebase.database().ref('/documents/'+HATZA.currentClient )
            var newDocumentRef = documentRef.push();
            newDocumentRef.set({
                locked:false,
                name: $scope.filename,
                url: localReferenceFile
            },onCompleteDocumentUploadDB())
        }
        else{
            console.log("CDC: DOCUMENT UPLOAD FAILED. INVALID PARAMETERS")
            $scope.fileUploadStatus = "Please choose the file first and wait for the 'READY' status"
        }
        
//        var ref = new Firebase(FBURL).child("documents").child(HATZA.selectedClient);
//        var marker = $firebaseArray(ref);
//        marker.$add({
//            email: $scope.marker.email,
//            coords:
//            {
//                latitude: $scope.marker.coords.latitude,
//                longitude: $scope.marker.coords.longitude
//            },
//            modalWindow: 
//            {
//                title:$scope.marker.modalWindow.title 
//            }     
//        });
        
    }
    
   var setCurrentClientName = function(client){
       var fbClientProfileName =  firebase.database().ref('/user/'+client+'/profile/name' ).once('value').then(function(snapshot) {
       var loadedClient = snapshot.val(); 
           console.log("CDC: CLIENT "+ JSON.stringify(loadedClient))
           $scope.currentClient = loadedClient
           $scope.$apply() ;
            
        })
   }
   
   var setCurrentClientDocuments = function(client){
       var FBcurrentClientDocuments =  firebase.database().ref('/documents/'+client ).once('value').then(function(snapshot) {
        var documentsList = snapshot.val(); 
        console.log("CDC: CLIENT DOCUMENTS "+ JSON.stringify(documentsList))
        $scope.currentClientDocuments = [];
        angular.forEach(documentsList, function(documentItem, uid){
            console.log("CDC: DOCUMENT: "+JSON.stringify(documentItem))
            var documentEmpty = true;
            if(documentItem.name!="" && documentItem.url!=""){
                documentEmpty = false;
            }
            var temp = {
                locked:documentItem.locked,
                name: documentItem.name,
                url: documentItem.url,
                empty: documentEmpty,
                uid: uid
            };
            $scope.currentClientDocuments.push(temp);
            $scope.documentForm.$setPristine();
            console.log("CDC: REFRESH")
            $scope.$apply();
            
        })})
   } 
   var setDocumentTemplates = function(){
       var FBDocumentTemplates =  firebase.database().ref('/documentsTemplates/' ).once('value').then(function(snapshot) {
        var documentTemplatesList = snapshot.val(); 
        console.log("CDC: CLIENT DOCUMENTS "+ JSON.stringify(documentTemplatesList))
        $scope.documentTemplates = [];
        angular.forEach(documentTemplatesList, function(documentTemplateItem, uidT){
            console.log("CDC: DOCUMENT: "+JSON.stringify(documentTemplateItem))
            var documentTemplateEmpty = true;
            if(documentTemplateItem.name!="" && documentTemplateItem.url!=""){
                documentTemplateEmpty = false;
            }
            var temp = {
                locked:documentTemplateItem.locked,
                name: documentTemplateItem.name,
                url: documentTemplateItem.url,
                empty: documentTemplateEmpty,
                uid: uidT
            };
            $scope.documentTemplates.push(temp);
            $scope.documentForm.$setPristine();
            console.log("CDC: REFRESH TEMPLATE")
            $scope.$apply();
            
        })})
   } 
     
   if(HATZA.currentClient == null){
       console.log("CDC: Tsek")
   }
   else{
       console.log("CDC: CURRENT CLIENT ID: "+HATZA.currentClient);
       setCurrentClientName(HATZA.currentClient);
       setCurrentClientDocuments(HATZA.currentClient );
       setDocumentTemplates();
   }
   
    
    
    
   
   
    
}]);