angular.module("myApp")
/**
 * Service for grading the members
 */
    .service("GradeService", function ($http) {

        /**
         * Get the grade info
         * @param token
         * @returns {JSON} grade info
         */
        this.getGradeInfo = function (token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/rate/start?token=" + token
            });
        };

        /**
         * Method to send the grades
         * @param token
         * @param ratings
         */
        this.sendGrades = function (token, ratings) {
            let data = {
                token: token,
                ratings: ratings
            };
            return $http({
                method: 'POST',
                url: "http://localhost:8080/v1/rate/finish",
                data: data
            });
        }
    });