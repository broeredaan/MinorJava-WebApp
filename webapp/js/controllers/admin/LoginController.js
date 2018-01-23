angular.module("myApp")
    .controller("LoginCtrl", function($scope, $location, LoginService, ModalService, $cookies) {
        this.title = "DUUNPC";
        $scope.$emit('updateMenu', false);

        this.submit = function() {
            let email = this.email;
            let pass = this.password;
            LoginService.login(email, pass).then(function(data) {
                data = data.data;
                if(data.token != null) {
                    $cookies.put("token", data.token);
                    if(data.admin == true) {
                        $cookies.put("isAdmin", data.admin);
                    }
                    $location.path("/groups");
                }
            }, function(error) {
                if(error.status === 401) {
                    ModalService.showModal("Error","Unrecognized combination of email and password. Please try again");
                }
                else {
                    ModalService.showModal("Error","Error getting data from server");
                }
            });
        };

        this.logout = function() {
            $location.path("/");
            $cookies.remove("token");
            $cookies.remove("isAdmin");
        }
    });
