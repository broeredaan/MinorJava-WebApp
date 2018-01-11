angular.module("myApp")
    .service("GroupsService", function($http) {
        this.getGroups = function() {
            return $http.get("https://jsonplaceholder.typicode.com/users");
        }
    });