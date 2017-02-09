/// <reference path="c:\users\roman\documents\visual studio 2015\Projects\LabaMaker\LabaMaker\Scripts/angular.js" />
/// <reference path="c:\users\roman\documents\visual studio 2015\Projects\LabaMaker\LabaMaker\toArrayFilter.js" />

var UserService = angular.module("UserService", []);

UserService.factory('UserApi', function ($http) {
    var urlBase = "http://localhost:16350/api";
    var UserApi = {};
    UserApi.getUsers = function () {
        return $http.get(urlBase + '/Users');
    };

    UserApi.AddUser = function (user) {
        return $http.post(urlBase + '/Users', user);
    };
    return UserApi;
});