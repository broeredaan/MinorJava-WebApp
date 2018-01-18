angular.module("myApp")
    .controller("DashboardCtrl", function($scope, LoginService) {
        LoginService.checkLogin();
        this.title = "DUUNPC";
        $scope.$emit('updateMenu', true);
    });