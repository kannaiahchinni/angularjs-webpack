require('angular');
require('angular-ui-router');

var app = angular.module('lrs', ['ui.router','lrs.login', 'lrs.home']);
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('home', {
        url: "/",
        views: {
            "": {
                templateUrl: "app/components/home/home.html"
            }
        }
    })
    .state('login', {
        url: "/login",
        views: {
            "": {
                templateUrl: "app/components/login/login.html"
            }
        }
    })
});
