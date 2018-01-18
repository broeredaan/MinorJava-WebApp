angular.module("myApp")
    .controller("DashboardCtrl", function($scope, $cookies, $location) {
        if($cookies.get("token") == null) {
            $location.path("/");
            alert("You're not logged in.");
        }
        this.title = "DUUNPC";
        $scope.$emit('updateMenu', true);
    });