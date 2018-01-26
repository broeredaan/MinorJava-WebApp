angular.module("myApp")
/**
 * Controller for templates
 */
    .controller("TemplatesCtrl", function ($scope, TemplateService, LoginService, ModalService, $timeout, $cookies, LangService) {
        //Check login
        LoginService.checkLogin();
        $scope.loading = true;
        $scope.withDescription = false;
        $scope.$emit('updateMenu', true);
        $scope.errorMessage = "";
        LangService.getLang().then(res => {
            $scope.lang = res;
        });

        //Refresh
        refreshTemplates();

        /**
         * Function to refresh templates
         */
        function refreshTemplates() {
            $scope.loading = true;
            TemplateService.getTemplates($cookies.get("token")).then(function (data) {
                    $scope.templates = data.data;
                    //Timeout
                    $timeout(function () {
                        $scope.loading = false;
                    }, 750)

                },
                /**
                 * Error handling
                 * @param error
                 */
                function (error) {
                    if (error.status === 401) {
                        LoginService.checkLogin(true);
                    }
                    else {
                        ModalService.showModal("Error", "Error getting data from server");
                        $scope.loading = false;
                    }
                });
        }

        /**
         * Function to refresh a single template view
         * @param id
         */
        function refreshSingleTemplate(id) {
            $scope.loading = true;
            TemplateService.getSingleTemplate($cookies.get("token"), id).then(function (data) {
                    $scope.singleTemplate = data.data;
                    $timeout(function () {
                        $scope.loading = false;
                    }, 750)

                },
                /**
                 * Error handling
                 * @param error
                 */
                function (error) {
                    if (error.status === 401) {
                        LoginService.checkLogin(true);
                    }
                    else {
                        ModalService.showModal("Error", "Error getting data from server");
                        $scope.loading = false;
                    }
                });
        }

        //Scope for creating template
        $scope.createTemplate = function () {
            $scope.isCreateTemplate = true;
        };

        //Close create template
        $scope.closeCreateTemplate = function () {
            refreshTemplates();
            $scope.isCreateTemplate = false;
        };

        //View single template
        $scope.viewTemplate = function (template) {
            refreshSingleTemplate(template.id);
            $scope.isViewTemplate = true;
        };

        //Close view for single template
        $scope.closeViewTemplate = function () {
            refreshTemplates();
            $scope.isViewTemplate = false;
        };

        /**
         * Function to submit new template
         * @param grade
         * @param desc
         * @param title
         */
        $scope.submit = function (grade, desc, title) {
            //Validate
            if (title == null || title == "") {
                $scope.errorMessage = "Please fill in a Template name";
            }
            else if (grade == null || grade < 0 || grade > 10) {
                $scope.errorMessage = "Please fill in a proper number from 0 to 10";
            }
            else {
                TemplateService.newTemplate(grade, desc, title, $cookies.get("token")).then(function (res) {
                        $scope.isCreateTemplate = false;
                        refreshTemplates();
                    },
                    /**
                     * Function for error handling
                     * @param error
                     */
                    function (error) {
                        if (error.status === 401) {
                            LoginService.checkLogin(true);
                        }
                        else {
                            ModalService.showModal("Error", "Something went wrong while creating a new template");
                        }
                    });
            }
        };

        /**
         * Function for deleting template
         * @param template
         */
        $scope.deleteTemplate = function (template) {
            TemplateService.deleteTemplate($cookies.get("token"), template).then(function (res) {
                    //Show modal
                    ModalService.showModal("Remove successful", "The template has been removed successfully");
                },
                /**
                 * Error handling function
                 * @param error
                 */
                function (error) {
                    if (error.status === 401) {
                        LoginService.checkLogin(true);
                    }
                    else {
                        ModalService.showModal("Error", "Unable to remove template");
                    }
                });
        }
    });