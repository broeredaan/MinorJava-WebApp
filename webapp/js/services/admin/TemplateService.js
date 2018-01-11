angular.module("myApp")
    .service("TemplateService", function($http) {
        this.getTemplates = function() {
            return $http.get("https://jsonplaceholder.typicode.com/users");
        }
    });