angular.module("myApp")
    .service("LangService", function($http) {
        this.getLang = function() {
            return $http({
                method: 'GET',
                url: "../..//language.json"
            });
        };
    });