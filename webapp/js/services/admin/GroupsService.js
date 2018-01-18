angular.module("myApp")
    .service("GroupsService", function($http) {
        this.getGroups = function(token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/group?userToken="+token
            });
        }
    });