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
                    $location.path("/dashboard");
                }
            }, function(error) {
                console.log(error);
                ModalService.showModal("Error getting data from server");
            });
        }
    });
