angular.module("myApp")
    .controller("DashboardCtrl", function($scope) {
        this.title = "DUUNPC";
        $scope.$emit('updateMenu', true);
    });