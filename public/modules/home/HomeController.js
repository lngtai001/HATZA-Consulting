HATZA.controller('HomeController', ['$scope', '$firebaseArray', '$firebaseObject', 'FBURL', function($scope,$firebaseArray, $firebaseObject, FBURL, firebaseUser){
     
    //do setup
    console.log("In setup")
    //console.log(JSON.stringify(HATZA.user))
    console.log(HATZA.user.uid)
    setupAccount = function(profile_id){ 
        console.log("RUN ACCOUNT SETUP")
        
        var usership = new Firebase(FBURL).child("user");       
        usership.child(profile_id).set({
            setup: true,
            privilegeLevel: 0,
            type: 'Client',
            company: '',
            profile: {
                name: HATZA.user.displayName,
                email: HATZA.user.email,
                contactNumber: "",
                gender: "",
                industry: "",
                profession: "",
                company: "",
                location: ""
            },
            bankingDetails: {
                bank: "",
                branch: "",
                branchCode: "",
                accountNumber: ""
            },
            documentList: {
                document_id: ""
            },
            FinancialStatements: {
                finance_id: ""
            },
            Meetings: {
                meeting_id: ""
            }
        }, onComplete);
              
    }
    var storeProfileInLocalStorage = function(firebaseUser){
        //localStorage.setItem("firebaseUser",JSON.stringify(firebaseUser));
        var currentUserType = localStorage.getItem("firebaseUserType");
        if(currentUserType != firebaseUser.type){
            console.log("CHANGING USER TYPE TO" + firebaseUser.type)
            localStorage.setItem("firebaseUserType",firebaseUser.type);
            location.reload();
        }
        
    }
    
    var checkIfExists = function(){
        console.log("Check if exists");
        HATZA.auth = firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              HATZA.user = user;
              console.log("USER LOGGED IN AT HOMECONTROLLER.js "+ HATZA.user.uid)
              localStorage.setItem("HatzaUser",JSON.stringify(user));
                var ref = new Firebase(FBURL).child("user").child(HATZA.user.uid);    
                FBProfile = $firebaseObject(ref);
                FBProfile.$loaded()
                    .then(function(){
                        console.log(FBProfile)
                        
                        console.log("SETUP: " +FBProfile.setup)
                        if (FBProfile.setup) {
                            console.log("Account exists with access level: " + FBProfile.privilegeLevel)  
                            storeProfileInLocalStorage(FBProfile)
                        }
                        else{
                            console.log("No there is no account yet")
                            console.log("Do Setup")
                            localStorage.setItem("firebaseUserType","Client");
                            setupAccount(HATZA.user.uid);

                        }    
                    })
            }
        });
    }
    checkIfExists();
    var onComplete = function(error) {
        if (error) {
          console.log('Synchronization failed');
        } else {
          console.log('Synchronization succeeded');
          
        }
    };
    
//setup();
}]);