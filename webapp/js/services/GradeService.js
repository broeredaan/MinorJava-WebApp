angular.module("myApp")
    .service("GradeService", function($http) {
        this.getGradeInfo = function(token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/rate/start?token="+token
            });
        };

        this.sendGrades = function(token, ratings) {
            let data  ={
                token: token,
                ratings: ratings
            };
            console.log(data);

            return $http({
                method: 'POST',
                url: "http://localhost:8080/v1/rate/finish",
                date: data
            });
        }
    });