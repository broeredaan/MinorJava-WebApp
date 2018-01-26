angular.module("myApp")
/**
 * Service for login
 */
    .service("LoginService", function ($http, $cookies, $location, ModalService) {
        this.login = function (mail, password) {
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

        /**
         * Function to check if user is logged in
         * @param fail
         * @param path
         */
        this.checkLogin = function (fail = false, path = "") {
            //Check if token is  set or correct
            if (($cookies.get("token") == null || fail) && path !== "/") {
                //Logout if not
                this.logout();
                //Show modal
                ModalService.showModal("Error", "You're not logged in.");
            }
        };

        /**
         * Function to log out
         */
        this.logout = function () {
            //Remove cookies
            $cookies.remove("token");
            $cookies.remove("isAdmin");
            $location.path("/");
        }

    });
