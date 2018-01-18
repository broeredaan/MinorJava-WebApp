angular.module("myApp")
    .service("YourGradeService", function($http) {
        this.getGradeInfo = function(token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/rate/start?token="+token
            });
        };

        this.sendGrades = function(grades) {
            return $http({
                method: 'POST',
                url: "http://localhost:8080/v1/rate/finish?token="+token,
                date: {
                    token = token,
                    ratedMemberId = ratedMemberId,
                    grade = grade,
                    comment = comment,
                }
            });
        }
    });