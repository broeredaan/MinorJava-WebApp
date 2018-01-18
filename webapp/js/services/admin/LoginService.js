angular.module("myApp")
    .service("LoginService", function($http) {
        this.login = function(mail, password) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/user/login?mail="+mail+"&password="+password
            });
        }
    });