angular.module("myApp")
    .controller("GradeCtrl", function($scope, $location, GradeService, ModalService) {

        $scope.token = null;
        $scope.tempToken = "";
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
            $scope.isNew = false;
            $scope.isOld = false;
            $scope.isSubmitted = false;
            $scope.isError = false;
            $scope.token = $location.search().token;
            if($scope.token != null) {
                GradeService.getGradeInfo($location.search().token).then(function(res) {
                    $scope.isNew = true;
                    $scope.rating = res.data;
                }, function(error) {
                    if(error.status === 401){
                        $scope.isOld = true;
                    }
                    else {
                        $scope.isError = true;
                    }
                });
            }
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
                        $scope.isNew = false;
                        $scope.isSubmitted = true;
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