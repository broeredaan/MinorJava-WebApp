angular.module("myApp")
    .service("LangService", function($http, $cookies) {
        this.getLangFromFile = function() {
            return $http({
                method: 'GET',
                url: "../..//language.json"
            });
        };

        this.getLang = function() {
            return this.getLangFromFile().then(res => {
                if($cookies.get("lang") != null) {
                    return res.data[$cookies.get("lang")];
                }
                else {
                    return res.data["Eng"];
                }
            });
        }
    });