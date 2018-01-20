angular.module("myApp")
    .controller("GradeCtrl", function($scope, $location, GradeService) {

        $scope.token = null;
        $scope.tempToken = "test";
        $scope.members = {
            "members": [
                {"name": "Daan"},
                {"name": "Raymond"},
                {"name": "Ronald"},
                {"name": "Joshmar"},
                {"name": "Jasper"}
            ],
            "groupGrade": 7,
            "gradeDifference": 2
        };

        $scope.$on('$locationChangeStart', function(event) {
            $scope.token = $location.search().token;
            GradeService.getGradeInfo($scope.token).then(function(res) {
                $scope.members = res;
            }, function(error) {

            });
        });


        $scope.newToken = function(token) {
            if(token != "" || token != null) {
                $scope.token = token;
                $location.search("token", token);
            }
            else {
                console.log("No token filled in");
            }
        }

    });