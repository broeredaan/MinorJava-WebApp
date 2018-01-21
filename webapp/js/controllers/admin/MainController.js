angular.module("myApp")

    .config(function($routeProvider, $locationProvider) {
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

    .controller("MainCtrl", function($scope, $location, $cookies, LoginService, MainService, ModalService) {
        LoginService.checkLogin(false, $location.path());
        $scope.showMenu = false;
        $scope.$on('updateMenu', function(event, mass) {
            $scope.showMenu = mass;
        });

        $scope.$on('$locationChangeStart', function(event) {
            $scope.isAdmin = $cookies.get("isAdmin");
        });

        $scope.logout = function() {
            $scope.isNewUser = false;
            $scope.isViewSettings = false;
            LoginService.logout();
        };

        $scope.settings = function() {
            $scope.isViewSettings = true;
            $scope.isNewUser = false;
        };

        $scope.closeSettings = function() {
            $scope.isViewSettings = false;
            $scope.isNewUser = false;
        };

        $scope.newUser = function() {
            $scope.isNewUser = true;
            $scope.isViewSettings = false;
        };

        $scope.closeNewUser = function() {
            $scope.isViewSettings = true;
            $scope.isNewUser = false;
        };

        $scope.createNewUser = function(newUser) {
            if(newUser.username == null || newUser.useremail == null || newUser.password == null || newUser.lang == null){
                ModalService.showModal("Error", "Please fill in all fields");
            }
            else {
                if(newUser.isAdmin == null) {
                    newUser.isAdmin = false;
                }
                MainService.createNewUser(newUser.username, newUser.useremail, newUser.isAdmin, newUser.password, newUser.lang).then(function(res) {
                    ModalService.showModal("Succes", "New user: " + name + " correstly created");
                }, function(error) {
                    ModalService.showModal("Error", "Error getting data from server");
                });
            }
        }
    });