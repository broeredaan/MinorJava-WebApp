angular.module("myApp")
/**
 * Service for language support
 */
    .service("LangService", function($http, $cookies) {

        /**
         * Get the languages from json file
         * @returns {JSON} language
         */
        this.getLangFromFile = function() {
            return $http({
                method: 'GET',
                url: "../../config/language.json"
            });
        };

        /**
         * Get form text from file
         * @returns {PromiseLike<T> | Promise<T>}
         */
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