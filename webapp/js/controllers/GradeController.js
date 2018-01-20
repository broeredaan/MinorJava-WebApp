angular.module("myApp")
    .controller("GradeCtrl", function($scope, $location, GradeService, ModalService) {

        $scope.token = null;
        $scope.tempToken = "test";
        /*
        $scope.rating = {
            "groupGrade": 7,
            "isCommentNeeded": true,
            "maxGradeDifference": 2,
            "ratings": [
                {
                    "id": 1,
                    "grade": 7,
                    "comment": "",
                    "ratedMember": {
                        "id": 1,
                        "name": "Daan"
                    }
                }
            ]
        };
        */
        $scope.rating = {};

        $scope.checkTotalGradeCount = function() {
            let points = 0;
            if($scope.rating.ratings != null){
                points += $scope.rating.groupGrade * $scope.rating.ratings.length;
                $scope.rating.ratings.forEach(rate => {
                    points -= rate.grade;
                });
            }
            return points;
        };

        $scope.$on('$locationChangeStart', function(event) {
            $scope.token = $location.search().token;
            GradeService.getGradeInfo($location.search().token).then(function(res) {
                console.log(res);
                $scope.rating = res.data;
            }, function(error) {
                console.log(error);
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
        };

        $scope.submit = function(rating) {
            $scope.rating = rating;
            if($scope.rating.ratings == null){
                console.log("Something went wrong?")
            }
            else if($scope.checkTotalGradeCount() < 0){
                console.log("You can give more than " + $scope.rating.groupGrade * $scope.rating.ratings.length + " grade points");
            }
            else if($scope.checkTotalGradeCount() > 0){
                console.log("Please use up all the grade points");
            }
            else {
                let ok = true;
                $scope.rating.ratings.forEach(rate => {
                    if(!angular.isNumber(rate.grade)) {
                        ok = false;
                    }
                });
                if(ok) {
                    GradeService.sendGrades($scope.token, createProperRatingsToSend($scope.rating.ratings)).then(function(res) {
                        console.log(res);
                    }, function(error) {
                        console.log(error);
                    })
                }
                else {
                    console.log("incorrect grades");
                }
            }

        };

        createProperRatingsToSend = function(ratings) {
            let fixedRatings = [];
            ratings.forEach(rate => {
                fixedRatings.push({
                    "ratedMember": rate.ratedMember,
                    "grade": rate.grade,
                    "comment": rate.comment,
                    "id": rate.id
                })
            });
            return fixedRatings;
        }

    });