angular.module("myApp")
/**
 * Main controller for application
 */
    .config(function($routeProvider, $locationProvider) {
        //Routes
        $routeProvider
            .when("/", {
                templateUrl : "admin/pages/login.html",
                controller: "LoginCtrl",
                controllerAs: "app"
            })
            .when("/dashboard", {
                templateUrl : "admin/pages/dashboard.html",
                controller: "DashboardCtrl",
                controllerAs: "app"
            })
            .when("/templates", {
                templateUrl : "admin/pages/templates.html",
                controller: "TemplatesCtrl",
                controllerAs: "app"
            })
            .when("/settings", {
                templateUrl : "admin/pages/settings.html",
                controller: "SettingsCtrl",
                controllerAs: "app"
            })
            .when("/groups", {
                templateUrl : "admin/pages/groups.html",
                controller: "GroupsCtrl",
                controllerAs: "app"
            })
            .otherwise({
                templateUrl : "admin/pages/error.html",
            });

        $locationProvider.hashPrefix('');
    })

    /**
     * Main controller
     */
    .controller("MainCtrl", function($scope, $location, $cookies, LoginService, MainService, ModalService, LangService, $window,sha256) {
        //Check if user is logged in
        LoginService.checkLogin(false, $location.path());
        $scope.showMenu = false;
        $scope.$on('updateMenu', function(event, mass) {
            $scope.showMenu = mass;
        });
        $scope.settingsLang = $cookies.get("lang");
        LangService.getLang().then(res => {$scope.lang = res;});

        /**
         * Function to handle location change
         */
        $scope.$on('$locationChangeStart', function(event) {
            $scope.isAdmin = $cookies.get("isAdmin");
            $scope.isViewSettings = false;
            $scope.isNewUser = false;
        });

        /**
         * Function for logout
         */
        $scope.logout = function() {
            $scope.isNewUser = false;
            $scope.isViewSettings = false;
            LoginService.logout();
        };

        /**
         * Function for settings
         */
        $scope.settings = function() {
            $scope.isViewSettings = true;
            $scope.isNewUser = false;
        };

        /**
         * Function for closing settings view
         */
        $scope.closeSettings = function() {
            $scope.isViewSettings = false;
            $scope.isNewUser = false;
        };

        /**
         * Function to show new user form
         */
        $scope.newUser = function() {
            $scope.isNewUser = true;
            $scope.isViewSettings = false;
        };

        /**
         * Function to close new user form
         */
        $scope.closeNewUser = function() {
            $scope.isViewSettings = true;
            $scope.isNewUser = false;
        };

        /**
         * Function to change language
         * @param lang
         */
        $scope.changeLang = function(lang) {
            $cookies.put("lang", lang);
            $window.location.reload();
            console.log($cookies.get("lang"));
        };

        /**
         * Function to create a new user
         * @param newUser
         */
        $scope.createNewUser = function(newUser) {
            //Validate input
            if(newUser.username == null || newUser.useremail == null || newUser.password == null || newUser.lang == null){
                ModalService.showModal("Error", "Please fill in all fields");
            }
            else {
                if(newUser.isAdmin == null) {
                    newUser.isAdmin = false;
                }
                MainService.createNewUser($cookies.get("token"), newUser.username, newUser.useremail, newUser.isAdmin, sha256.convertToSHA256(newUser.password), newUser.lang).then(function(res) {
                    ModalService.showModal("Succes", "New user: " + name + " correctly created");
                },
                    /**
                     * Error handling function
                     * @param error
                     */
                    function(error) {
                    ModalService.showModal("Error", "Error getting data from server");
                });
            }
        }
    });