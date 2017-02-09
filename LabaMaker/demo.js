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

MyApp.controller("AddController", function ($scope, UserApi) {
    
    $scope.addUsr = function () {
        var userToAdd = {
            'full_name': $scope.full_name,
            'username': $scope.username,
            'password': $scope.password,
            'payment_acc': $scope.payment_acc
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


MyApp.controller("EditController", function ($scope, UserApi) {

    $scope.selectedItem = "Select User";
    $scope.isDeleteItemVisible = false;
    getUsers();
    function getUsers() {
        UserApi.getUsers().then(function (users) {
            $scope.users = users.data;
        })
        .catch(function (error) {
            $scope.status = 'Unable to load users: ' + error.message;
        })
    };

    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.id;
        $scope.full_name = item.full_name;
        $scope.username = item.username;
        $scope.password = item.password;
        $scope.payment_acc = item.payment_acc;
        $scope.id = item.id;
    };

    $scope.UpdateUser = function () {

        var userToUpdate = {
            'id': $scope.id,
            'full_name': $scope.full_name,
            'username': $scope.username,
            'password': $scope.password,
            'payment_acc': $scope.payment_acc
        };

        UserApi.EditUser(userToUpdate)
         .then(function (response) {
             alert("User info updated");
             $scope.full_name = undefined;
             $scope.username = undefined;
             $scope.password = undefined;
             $scope.payment_account = undefined;
             $scope.id = undefined;
             $scope.selectedItem = "Select user";
             $scope.isDeleteItemVisible = false;
             getUsers();
         })
          .catch(function (response) {
              alert("Failed to update");
          });
    }
});


MyApp.controller("DeleteController", function ($scope, UserApi) {
        
    $scope.selectedItem = "Select User";
    $scope.isDeleteItemVisible = false;
    getUsers();
    function getUsers() {
        UserApi.getUsers().then(function (users) {
            $scope.users = users.data;
        })
        .catch(function (error) {
            $scope.status = 'Unable to load users: ' + error.message;
        })
    };

    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.id;
        $scope.full_name = item.full_name;
        $scope.username = item.username;
        $scope.password = item.password;
        $scope.payment_acc = item.payment_acc;
        $scope.id = item.id;
    };

    $scope.DeleteUser = function () {

        var userIdToDelete = {
            'id': $scope.id
        };

        UserApi.DeleteUser(userIdToDelete)
         .then(function (response) {
             alert("User info deleted");
             $scope.full_name = undefined;
             $scope.username = undefined;
             $scope.password = undefined;
             $scope.payment_account = undefined;
             $scope.id = undefined;
             $scope.selectedItem = "Select user";
             $scope.isDeleteItemVisible = false;
             getUsers();
         })
          .catch(function (response) {
              alert("Failed to delete");
          });
    }
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