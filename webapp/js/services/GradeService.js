angular.module("myApp")
    .service("GradeService", function($http) {
        this.getGradeInfo = function(token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/rate/start?token="+token
            });
        };

        this.sendGrades = function(token, rateMemberId, grade, comment) {
            let data  ={
                token: token,
                ratedMemberId: ratedMemberId,
                grade: grade,
                comment: comment,
            };

            return $http({
                method: 'POST',
                url: "http://localhost:8080/v1/rate/finish?token="+token,
                date: data
            });
        }
    });