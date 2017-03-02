var HATZA = angular.module('WTPA-App', ['ngRoute','firebase','ui.router']);

HATZA.config(["$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    //HOME
    $stateProvider
        .state('home', {
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
        .state('dashboard.home', {
            //  Posts state. This state will contain nested views
            url: '/home',
            templateUrl: 'modules/dashboard/page-dashboardHome.html'
        })
        .state('dashboard.profile', {
            //  Posts state. This state will contain nested views
            url: '/profile',
            
            views: {
                '': {
                    templateUrl: 'modules/profile/page-profile.html',
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
  'https://wtpa-1479834006191.firebaseio.com/'
  //Use the URL of your project here with the trailing slash
);
