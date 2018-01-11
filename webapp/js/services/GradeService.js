angular.module("myApp")
    .service("YourGradeService", function($http) {
        this.getGradeInfo = function(token) {
            return $http.get("https://jsonplaceholder.typicode.com/users");
        }
    });