angular.module("myApp")
    .service("LoginService", function($http) {
        this.getTemplates = function() {
            return $http.get("https://jsonplaceholder.typicode.com/users");
        }
    });