angular.module("myApp")
    .controller("LoginCtrl", function($scope, $location) {
        this.title = "DUUNPC";
        $scope.$emit('updateMenu', false);

        this.submit = function() {
            let email = this.email;
            let pass = this.password;
            if(email == "test" && pass == "test") {
                $location.path("/dashboard");
            }
            else {
                console.log("Invalid login");
            }
        }
    });