angular.module("myApp")
    .controller("TemplatesCtrl", function($scope, TemplateService, LoginService, ModalService, $timeout, $cookies, LangService) {
        LoginService.checkLogin();
        $scope.loading = true;
        $scope.withDescription = false;
        $scope.$emit('updateMenu', true);

        $scope.errorMessage = "";

        LangService.getLang().then(res => {$scope.lang = res;});

        refreshTemplates();

        function refreshTemplates() {
            $scope.loading = true;
            TemplateService.getTemplates($cookies.get("token")).then(function(data) {
                $scope.templates = data.data;
                $timeout(function() {
                    $scope.loading = false;
                }, 750)

            }, function(error) {
                if(error.status === 401){
                    LoginService.checkLogin(true);
                }
                else {
                    ModalService.showModal("Error", "Error getting data from server");
                    $scope.loading = false;
                }
            });
        }

        function refreshSingleTemplate(id) {
            $scope.loading = true;
            TemplateService.getSingleTemplate($cookies.get("token"), id).then(function(data) {
                $scope.singleTemplate = data.data;
                $timeout(function() {
                    $scope.loading = false;
                }, 750)

            }, function(error) {
                if(error.status === 401){
                    LoginService.checkLogin(true);
                }
                else {
                    ModalService.showModal("Error", "Error getting data from server");
                    $scope.loading = false;
                }
            });
        }

        $scope.createTemplate = function() {
            $scope.isCreateTemplate = true;
        };

        $scope.closeCreateTemplate = function() {
            refreshTemplates();
            $scope.isCreateTemplate = false;
        };

        $scope.viewTemplate = function(template) {
            refreshSingleTemplate(template.id);
            $scope.isViewTemplate = true;
        };

        $scope.closeViewTemplate = function() {
            refreshTemplates();
            $scope.isViewTemplate = false;
        };

        //New Template workings

        $scope.submit = function(grade, desc, title) {
            if(title == null || title == "") {
                $scope.errorMessage = "Please fill in a Template name";
            }
            else if(grade == null || grade < 0 || grade > 10) {
                $scope.errorMessage = "Please fill in a proper number from 0 to 10";
            }
            else {
                TemplateService.newTemplate(grade, desc, title, $cookies.get("token")).then(function(res) {
                    $scope.isCreateTemplate = false;
                    refreshTemplates();
                }, function(error) {
                    if(error.status === 401){
                        LoginService.checkLogin(true);
                    }
                    else {
                        ModalService.showModal("Error", "Something went wrong while creating a new template");
                    }
                });
            }
        };

        $scope.deleteTemplate = function(template) {
            TemplateService.deleteTemplate($cookies.get("token"), template).then(function(res) {
                ModalService.showModal("Remove successful", "The template has been removed successfully");
            }, function(error) {
                if(error.status === 401){
                    LoginService.checkLogin(true);
                }
                else {
                    ModalService.showModal("Error", "Unable to remove template");
                }
            });
        }
    });