angular.module("myApp")
    .service("LoginService", function($http, $cookies, $location) {
        this.login = function(mail, password) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/user/login?mail="+mail+"&password="+password
            });
        };

        this.checkLogin = function(fail = false) {
            if($cookies.get("token") == null || fail){
                this.logout();
                alert("You're not logged in.");
            }
        };

        this.logout = function() {
            $cookies.remove("token");
            $location.path("/");
        }

    });