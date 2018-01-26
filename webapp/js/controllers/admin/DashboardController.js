angular.module("myApp")
/**
 * Controller for the dashboard
 */
    .controller("DashboardCtrl", function($scope, LoginService, LangService) {
        LoginService.checkLogin();
        $scope.$emit('updateMenu', true);
        LangService.getLang().then(res => {$scope.lang = res;});
    });