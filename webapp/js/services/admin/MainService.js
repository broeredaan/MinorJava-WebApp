angular.module("myApp")
    .service("MainService", function($http) {
        this.getSettings = function(token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/user?userToken="+token
            });
        };

        this.createNewUser = function(name, mail, isAdmin, password, lang) {
            let data = {
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