angular.module("myApp")
    .controller("DashboardCtrl", function($scope, LoginService, LangService) {
        LoginService.checkLogin();
        this.title = "DUUNPC";
        $scope.$emit('updateMenu', true);
        LangService.getLang().then(res => {$scope.lang = res;});
    });