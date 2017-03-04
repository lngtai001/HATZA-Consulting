var HATZA = angular.module('HATZA-App', ['ngRoute','firebase','ui.router']);
HATZA.user = null;
HATZA.auth = null;
// when the dom is ready, so we sure we can bootstrap angular manually
var init = function () {    
    HATZA.auth = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          HATZA.user = user;
          console.log("USER LOGGED IN AT APPLICATION.js "+ HATZA.user.uid)
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

HATZA.config(["$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    //HOME
    $stateProvider
        .state('home', {
//            resolve:{
//                LoggedInUser:  function(){                     
//                    
//                    return firebase.auth().onAuthStateChanged(function(user) {
//                        if (user) {console.log("start resolve")
//                            // User is signed in.
//                            console.log("Loggedin - User "+user.uid);
//                            return user;
//                        } else {
//                            // No user is signed in.
//                            console.log("NOT loggedin User "+user);
//                        }
//                        })
//                    .then (function (data) {
//                        return data;
//                        console.log("Data returned in promise")
//                    });
//                }
//            },
            //  Posts state. This state will contain nested views
            url: '/home',
            templateUrl: 'modules/home/home.html'
            
        });

     //DASHBOARD
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
                   templateUrl: 'modules/dashboard/view-dashboard-nav.html'
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
        .state('dashboard.documents', {
            //  Posts state. This state will contain nested views
            url: '/documents',
            templateUrl: 'modules/dashboard/page-documents.html'
        })
        .state('dashboard.bookSession', {
            //  Posts state. This state will contain nested views
            url: '/bookSession',
            views: {
                '': {
                    templateUrl: 'modules/dashboard/page-bookSession.html'
                }
            }
        })
        .state('dashboard.statementOfWork', {
            //  Posts state. This state will contain nested views
            url: '/statementOfWork',
            templateUrl: 'modules/dashboard/page-statementOfWork.html'
        })
        .state('dashboard.financing', {
            //  Posts state. This state will contain nested views
            url: '/financing',
            templateUrl: 'modules/dashboard/page-financing.html'
        });


    //EVENTS
    $stateProvider
        .state('events', {
            //  Events state. This state will contain nested views
            url: '/events',
            views: {
                '': {
                   templateUrl: 'modules/events/page-events.html' ,
                   controller: 'ListController'
                },
                'map@events': {
                   templateUrl: 'modules/events/view-events-map.html'
                },
                'list@events': {
                   templateUrl: 'modules/events/view-events-list.html'

                }
            }
        })
        .state('eventsAdd', {
            //  Posts state. This state will contain nested views
            url: '/eventsAdd',
            controller: 'AddController',
            templateUrl: 'modules/events/page-events-add.html'
        })
        .state('eventsEdit/', {
            //  Posts state. This state will contain nested views
            url: '/eventsEdit/:id',
            controller: 'EditController',
            templateUrl: 'modules/events/page-events-edit.html'
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
             controller: 'AccountController',
            templateUrl: 'modules/profile/page-profile.html'
        });
}]);

HATZA.constant('FBURL',
  'https://hatza-692c7.firebaseio.com/'
  //Use the URL of your project here with the trailing slash
);
