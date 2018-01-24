angular.module("myApp")
    .service("LoginService", function($http, $cookies, $location, ModalService) {
        this.login = function(mail, password) {
            //password = sha256(password);
            let data = {
                mail: mail,
                password: password
            };
            return $http({
                method: 'POST',
                url: "http://localhost:8080/v1/user/login",
                data: data
            });
        };

        this.checkLogin = function(fail = false, path = "") {
            if(($cookies.get("token") == null || fail) && path !== "/"){
                this.logout();
                ModalService.showModal("Error","You're not logged in.");
            }
        };

        this.logout = function() {
            $cookies.remove("token");
            $cookies.remove("isAdmin");
            $location.path("/");
        }

    });
