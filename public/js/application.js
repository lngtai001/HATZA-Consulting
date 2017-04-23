var HATZA = angular.module('HATZA-App', ['ngRoute','firebase','ui.router']);
HATZA.user = JSON.parse(localStorage.getItem("HatzaUser"));
HATZA.auth = null;
HATZA.currentClient = localStorage.getItem("currentClient");
HATZA.firebaseUserType = localStorage.getItem("firebaseUserType");
if(HATZA.firebaseUserType == null){
    HATZA.firebaseUserType = "Client"
}


HATZA.service("SetupService", function(){//put SetupService in the included items and then call the function in that constructor
   this.doesUserExist = function(){
       console.log("Service hello world")
   }    
});



// when the dom is ready, so we sure we can bootstrap angular manually
var init = function () { 
    HATZA.auth = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          HATZA.user = user;
          console.log("USER LOGGED IN AT APPLICATION.js "+ HATZA.user.uid)
          localStorage.setItem("HatzaUser",JSON.stringify(user));
          var testUser = localStorage.getItem("HatzaUser")
          var testUserJSON = JSON.parse(testUser)
          var testUserUID = testUserJSON['uid']
          console.log("Local user after login: "+testUserUID)
        }
    });
};
init();
//var authentication = function ($q, $location) {
//        console.log("----FIREBASE AUTH")
//        var deferred = $q.defer();
//
//        // go to the dashboard when the user is logged in
//        if (HATZA.user != null) {
//           indow.location = "index.html";
//           console.log("COMPLETE")
//            deferred.resolve(HATZA.user);
//            
//        } else {
//            // go to the login form when the user is logged logged out, or never had logged in
//            console.log("NOT YET")
//            deferred.resolve(null);
//        }
//        return deferred.promise;
//    
//}
if(HATZA.firebaseUserType == "Client")  {
    console.log("USER TYPE: " + HATZA.firebaseUserType);
    HATZA.config(["$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('dashboard');
        //HOME
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'modules/home/home.html',
                controller: 'HomeController'
            });
         //DASHBOARD CLIENT
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    '': {
                       templateUrl: 'modules/dashboard/page-dashboard.html'
                       //controller: 'ListController'
                    },
                    'nav@dashboard': {
                       templateUrl: 'modules/dashboard/view-dashboard-nav.html'
                    }
                }
            })
            //DASHBOARD HOME
            .state('/dashboard.home', {
                //  Posts state. This state will contain nested views
                url: '/home',
                templateUrl: 'modules/dashboard/page-dashboardHome.html'
            })
            //DASHBOARD PROFILE
            .state('dashboard.profile', {
                //  Posts state. This state will contain nested views
                url: '/profile',

                views: {
                    '': {

                        templateUrl: 'modules/profile/page-profile.html',
                        controller: 'ProfileController'
                    },
                    'map@dashboard.profile': {
                       templateUrl: 'modules/profile/view-profile-map.html'
                    }
                }
            })
            //DASHBOARD DOCUMENTS
            .state('dashboard.documents', {
                //  Posts state. This state will contain nested views
                url: '/documents',
                templateUrl: 'modules/dashboard/page-documents.html',
                controller: "DocumentsController"
            })
            //DASHBOARD BOOK A SESSION
            .state('dashboard.bookSession', {
                //  Posts state. This state will contain nested views
                url: '/bookSession',
                views: {
                    '': {
                        templateUrl: 'modules/dashboard/page-bookSession.html'
                    }
                }
            })
            //DASHBOARD STATEMENT OF WORK
            .state('dashboard.statementOfWork', {
                //  Posts state. This state will contain nested views
                url: '/statementOfWork',
                templateUrl: 'modules/dashboard/page-statementOfWork.html'
            })
            //DASHBOARD FINANCING
            .state('dashboard.financing', {
                //  Posts state. This state will contain nested views
                url: '/financing',
                templateUrl: 'modules/dashboard/page-financing.html'
            });


        //ACCOUNT - finance
        $stateProvider
            .state('account', {
                url: '/account',
                templateUrl: 'modules/account/page-account.html',
                controller: 'AccountController'
            });

        //PROFILE
        $stateProvider
            .state('profile', {
                //  Posts state. This state will contain nested views
                url: '/profile',
                 controller: 'ProfileController',
                templateUrl: 'modules/profile/page-profile.html'
            });


    }]);
}
//CONSULTANT --------------
else{
    console.log("USER TYPE: " + HATZA.firebaseUserType);
    HATZA.config(["$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('dashboard/home');
        //HOME
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'modules/home/home.html',
                controller: 'HomeController'

            });
            //DASHBOARD CONSULTANT
            $stateProvider
            .state('dashboard', {
                //  Events state. This state will contain nested views
                url: '/dashboard',
                views: {
                    '': {
                       templateUrl: 'modules/dashboard/page-dashboard.html'
                       //controller: 'ListController'
                    },
                    'nav@dashboard': {
                       templateUrl: 'modules/dashboard/view-dashboard-navConsultant.html'
                    }
                }
            })
            //DASHBOARD HOME
            .state('dashboard.home', {
                //  Posts state. This state will contain nested views
                url: '/home',
                templateUrl: 'modules/dashboard/page-dashboardHome.html'
            })
            //DASHBOARD PROFILE
            .state('dashboard.profile', {
                //  Posts state. This state will contain nested views
                url: '/profile',

                views: {
                    '': {

                        templateUrl: 'modules/profile/page-profile.html',
                        controller: 'ProfileController'
                    },
                    'map@dashboard.profile': {
                       templateUrl: 'modules/profile/view-profile-map.html'
                    }
                }
            })
            //DASHBOARD DIARY
            .state('dashboard.diary', {
                //  Posts state. This state will contain nested views
                url: '/diary',

                views: {
                    '': {

                        templateUrl: 'modules/diary/page-diary.html',
                        controller: 'DiaryController'
                    }
                }
            })
            //DASHBOARD DOCUMENT TEMPLATES
            .state('dashboard.documentTemplates', {
                //  Posts state. This state will contain nested views
                url: '/documentTemplates',

                views: {
                    '': {

                        templateUrl: 'modules/documents/page-documentTemplates.html',
                        controller: 'DocumentTemplatesController'
                    }
                }
            })
            //DASHBOARD CLIENTS
            .state('dashboard.clients', {
                //  Posts state. This state will contain nested views
                url: '/clients',

                views: {
                    '': {

                        templateUrl: 'modules/clients/page-clients.html',
                        controller: 'ClientsController'
                    }
                }
            })
            //DASHBOARD CLIENT DOCUMENTS
            .state('dashboard.clientDocuments', {
                //  Posts state. This state will contain nested views
                url: '/clientDocuments',

                views: {
                    '': {

                        templateUrl: 'modules/documents/page-clientDocuments.html',
                        controller: 'ClientDocumentsController'
                    }
                }
            })
            //DASHBOARD WORKBREAKDOWN
            .state('dashboard.clientWorkBreakdown', {
                //  Posts state. This state will contain nested views
                url: '/clientWorkBreakdown',

                views: {
                    '': {

                        templateUrl: 'modules/clients/page-clientWorkBreakdown.html',
                        controller: 'ClientWorkBreakdownController'
                    }
                }
            })
            //DASHBOARD ACCOUNT
            .state('dashboard.clientAccount', {
                //  Posts state. This state will contain nested views
                url: '/clientAccount',

                views: {
                    '': {

                        templateUrl: 'modules/clients/page-clientAccount.html',
                        controller: 'ClientAccountController'
                    }
                }
            });
            
    }]);
}

HATZA.constant('FBURL',
  'https://hatza-692c7.firebaseio.com/'
  //Use the URL of your project here with the trailing slash
);
