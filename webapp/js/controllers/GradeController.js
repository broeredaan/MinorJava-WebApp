angular.module("myApp")
    .controller("GradeCtrl", function($scope, $location) {

        $scope.token = null;
        $scope.tempToken = "test";

        $scope.$on('$locationChangeStart', function(event) {
            $scope.token = $location.search().token;
        });


        $scope.newToken = function(token) {
            if(token != "") {
                $scope.token = token;
                $location.search("token", token);
            }
            else {
                console.log("No token filled in");
            }
        }

    });