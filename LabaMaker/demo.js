/// <reference path="c:\users\roman\documents\visual studio 2015\Projects\LabaMaker\LabaMaker\Scripts/angular.js" />

var MyApp = angular.module("MyApp", ["ngRoute", "UserService"]);

MyApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/Add', {
                templateUrl: 'Views/add.html',
                controller: 'AddController'
            }).
            when('/Edit', {
                templateUrl: 'Views/edit.html',
                controller: 'EditController'
            }).
            when('/Delete', {
                templateUrl: 'Views/delete.html',
                controller: 'DeleteController'
            }).
            when('/', {
                templateUrl: 'Views/home.html',
                controller: 'HomeController'
            }).
            otherwise({
                redirectTo: '/'
            })
    $locationProvider.html5Mode(true);
    });

MyApp.controller("AddController", function ($scope) {
    
    $scope.addUsr = function () {
        var userToAdd = {
            'full_name': $scope.full_name,
            'username': $scope.username,
            'password': $scope.password,
            'payment_account': $scope.password
        };
        UserApi.AddUser(userToAdd)
        .then(function (response) {
            alert("User added");
            $scope.full_name = undefined;
            $scope.username = undefined;
            $scope.password = undefined;
            $scope.payment_account = undefined;
        })
        .catch(function (response) {
            alert("Failed to add user");
        });
    }

});
MyApp.controller("EditController", function ($scope) {
    $scope.message = "Edit View";
});
MyApp.controller("DeleteController", function ($scope) {
    $scope.message = "delete View";
});


MyApp.controller("HomeController", function ($scope, UserApi) {

    getUsers();
    function getUsers() {
        $scope.users = [];
        UserApi.getUsers().then(function (users) {
            $scope.users = users.data;
        })
        .catch(function (error) {
            $scope.status = 'Unable to load users' + error.message;
        })
    }
});