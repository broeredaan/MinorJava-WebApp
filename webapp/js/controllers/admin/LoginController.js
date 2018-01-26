angular.module("myApp")
/**
 * Controller for login
 */
    .controller("LoginCtrl", function($scope, $location, LoginService, ModalService, LangService, $cookies,sha256) {
        $scope.$emit('updateMenu', false);
        LangService.getLang().then(res => {$scope.lang = res;});
        /**
         * Function to submit
         */
        this.submit = function() {
            let email = this.email;
            let pass = this.password;
            //Login
            LoginService.login(email, sha256.convertToSHA256(pass)).then(function(data) {
                data = data.data;
                //Check if token is set
                if(data.token != null) {
                    $cookies.put("token", data.token);
                    if(data.admin === true) {
                        $cookies.put("isAdmin", data.admin);
                    }
                    $location.path("/groups");
                }
            },
                /**
                 * Error handling function
                 * @param error
                 */
                function(error) {
                if(error.status === 401) {
                    ModalService.showModal("Error","Unrecognized combination of email and password. Please try again");
                }
                else {
                    ModalService.showModal("Error","Error getting data from server");
                }
            });
        };

        /**
         * Function to let a user log out
         */
        this.logout = function() {
            //Redirect
            $location.path("/");
            //Remove cookies
            $cookies.remove("token");
            $cookies.remove("isAdmin");
        }
    });
