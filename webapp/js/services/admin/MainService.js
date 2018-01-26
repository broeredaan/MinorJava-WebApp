angular.module("myApp")
/**
 * Main service
 */
    .service("MainService", function($http) {

        /**
         * Function to get the settings
         * @param token
         * @returns {JSON} settings
         */
        this.getSettings = function(token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/user?userToken="+token
            });
        };

        /**
         * Function create new user
         * @param token
         * @param name
         * @param mail
         * @param isAdmin
         * @param password
         * @param lang
         */
        this.createNewUser = function(token, name, mail, isAdmin, password, lang) {
            let data = {
                userToken: token,
                name: name,
                email: mail,
                isAdmin: isAdmin,
                password: password,
                language: lang
            };
            return $http({
                method: 'PUT',
                url: "http://localhost:8080/v1/user/create",
                data: data
            });
        }
    });