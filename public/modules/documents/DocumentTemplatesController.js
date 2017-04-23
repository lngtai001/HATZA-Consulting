HATZA.controller('DocumentTemplatesController', ['$scope', function($scope){
   //Variable used by the create document privilege dropdown to set a document template privilege level
   $scope.privilegeLevels = ["0", "1", "2"];  
   var localReferenceFile = null;

   //Initiates the deletion procedure of a document     
   $scope.deleteDocument = function(referenceFileUID, referenceFileURL, referenceFileName){
        console.log("DTC: DELETE DOCUMENT: \nNAME:"+ referenceFileName + "\nURL:" + referenceFileURL);
        //Get a reference to the file in Firebase
        var fileDownloadRef = firebase.storage().ref('documentsTemplates/' + referenceFileURL)
        //Delete the file from Firebase storage
        fileDownloadRef.delete().then(function() {
          console.log("DTC: DELETE SUCCESS STORAGE: ")
          //Initiates the deletion of the document metadata after the file has been deleted from storage successfully
          deleteFileFromDB(referenceFileUID)
        }).catch(function(error) {
           console.log("DTC: DELETE FAILED FOR STORAGE: " +error)
        });
    }
    
    //Deletes the file from the database
    var deleteFileFromDB = function(referenceFileUID){
        var documentRef =  firebase.database().ref('/documentsTemplates/'+ referenceFileUID)
        documentRef.remove(function (error) {
            if (!error) {
                console.log("DTC: DELETE SUCCESS DB: ")
                setDocumentTemplates()
            }
            else{
                 console.log("DTC: DELETE FAILED FOR DB: " +error)
            }
        })
    }
    
    $scope.downloadDocument = function(referenceFile){
        console.log("DTC: DOWNLOAD DOC: ")
        console.log("DTC: REF FILE: " +referenceFile)
        //Get reference to the file to be downloaded
        var fileDownloadRef = firebase.storage().ref('documentsTemplates/' +HATZA.currentClient+"/"+ referenceFile);
        fileDownloadRef.getDownloadURL().then(function(referenceURL) {
            console.log("DTC: URL: " + referenceURL);
            //Open the document in a new tab to allow downloading
            $window.open(referenceURL, '_blank');
        }).catch(function(error) {
           console.log("DTC: DOWNLOAD FILE FAILED: "+error)
        });
    }
    
    var onCompleteDocumentUploadStorage = function(error) {
        if (error) {
          console.log('DTC: UPLOAD FAILED' + error);
          $scope.fileUploadStatus = "UPLOAD FAILED"
          $scope.files = null;
        } else {
          console.log('DTC: UPLOAD SUCCESS');
          //Set UI status
          $scope.fileUploadStatus = "File READY, Please enter the filename and add document"
          $scope.$apply()
          $scope.files = null;
        }
    };
    
    var documentUploadStorage = function(files){ 
        console.log("UPLOAD FILE");
        //Create reference to new file location
        var storageRef = firebase.storage().ref(('documentsTemplates/' + files[0].name));
        console.log("storageRef "+ storageRef)
        //Set UI status
        $scope.fileUploadStatus = "UPLOADING file, Please wait ...  ";
        $scope.$apply() ;
        //Upload the file
        storageRef.put(files[0]).then(function(snapshot) {
            $scope.fileUploadStatus = "UPLOAD PROCESSING";
            storageRef.getDownloadURL().then(function(result){
            console.log("DTC: uploaded: " +result);
            localReferenceFile = files[0].name;
        }, onCompleteDocumentUploadStorage());
   })
    }
    $scope.filename = "";
    $scope.documentPrivilegeLevel = "";
    $scope.uploadDocument = function(element){ //accessible by html
        $scope.files = element.files 
        console.log($scope.files)
        console.log("DTC: UPLOAD: "+$scope.filename + "\nPrivilege Level: "+ $scope.documentPrivilegeLevel );
        documentUploadStorage($scope.files);
    }
    
    
    var onCompleteDocumentUploadDB = function(error) {
        if (error) {
          console.log('DTC: TRANSACTION FAILED');
          $scope.fileUploadStatus = "UPLOAD FAILED"
          $scope.files = null;
        } else {
          console.log('DTC: TRANSACTION SUCCESS');
          $scope.fileUploadStatus = "UPLOAD SUCCESS"
          $scope.files = null;
          setDocumentTemplates()
        }
    };
    $scope.documentUploadDB = function(){
        console.log("DTC: ADD DOC TO USER\nFILE NAME:" +$scope.filename +"\nURL: " +localReferenceFile
                + "\nUSER: "+HATZA.currentClient)
        //If the conditions are met to upload the file with the required data
        if(HATZA.currentClient!=null && localReferenceFile !=null && localReferenceFile !="" && $scope.filename!=""){
            //Get reference to the database location for the document data
            var documentRef =  firebase.database().ref('/documentsTemplates/')
            var newDocumentRef = documentRef.push();
            newDocumentRef.set({
                locked:false,
                name: $scope.filename,
                url: localReferenceFile,
                privilegeLevel: $scope.documentPrivilegeLevel 
            },onCompleteDocumentUploadDB())
        }
        else{
            console.log("DTC: DOCUMENT UPLOAD FAILED. INVALID PARAMETERS")
            //Inform the user to follow the correct procedure
            $scope.fileUploadStatus = "Please choose the file first and wait for the 'READY' status"
        }
    }
    
   var setCurrentClientName = function(client){
       //get client name from id
       var fbClientProfileName =  firebase.database().ref('/user/'+client+'/profile/name' ).once('value').then(function(snapshot) {
           var loadedClient = snapshot.val(); 
           console.log("DTC: CLIENT "+ JSON.stringify(loadedClient))
           $scope.currentClient = loadedClient
           $scope.$apply() ;
        })
   }
   
   var setDocumentTemplates = function(){
       var FBDocumentTemplates =  firebase.database().ref('/documentsTemplates/' ).once('value').then(function(snapshot) {
            var documentTemplatesList = snapshot.val(); 
            console.log("DTC: CLIENT DOCUMENTS "+ JSON.stringify(documentTemplatesList))
            $scope.documentTemplates = [];
            //Iterate through the documents data
            angular.forEach(documentTemplatesList, function(documentTemplateItem, uidT){
                console.log("DTC: DOCUMENT: "+JSON.stringify(documentTemplateItem))
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
                console.log("DTC: REFRESH TEMPLATE")
                $scope.$apply();
            })
        })
   } 
     
   if(HATZA.currentClient == null){
       console.log("DTC: Tsek")
   }
   else{
       console.log("DTC: CURRENT CLIENT ID: "+HATZA.currentClient);
       setCurrentClientName(HATZA.currentClient);
       setDocumentTemplates();
   }
   
    
    
    
    
    
}]);