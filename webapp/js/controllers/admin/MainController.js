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
                templateUrl : "pages/error.html",
            });

        $locationProvider.hashPrefix('');
    })

    .controller("MainCtrl", function($scope, $location) {
        $scope.showMenu = false;
        $scope.$on('updateMenu', function(event, mass) {
            $scope.showMenu = mass;
        });

        $scope.logout = function() {
            $location.path("/");
        };

        $scope.settings = function() {
            $scope.isViewSettings = true;
        };

        $scope.closeSettings = function() {
            $scope.isViewSettings = false;
        }
    });