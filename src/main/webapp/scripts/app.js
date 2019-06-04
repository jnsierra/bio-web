var app = angular.module("binformaticaApp", ['ngCookies', 'ngRoute', 'ngDialog']);

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "template/modules/home/views/index.html",
        controller: "homeController"
    }).otherwise({
        reditrectTo: "/"
    });
});