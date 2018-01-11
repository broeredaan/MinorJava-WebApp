angular.module("myApp")
    .controller("TemplatesCtrl", function($scope, TemplateService, $timeout) {
        $scope.loading = true;
        $scope.$emit('updateMenu', true);

        refreshTemplates();

        function refreshTemplates() {
            $scope.loading = true;
            TemplateService.getTemplates().then(function(data) {
                $scope.templates = data.data;
                $timeout(function() {
                    $scope.loading = false;
                }, 750)

            }, function() {
                alert("Error getting data from server");
                $scope.loading = false;
            });
        };

        $scope.createTemplate = function() {
            $scope.isCreateTemplate = true;
            console.log("create new template");
        };

        $scope.closeCreateTemplate = function() {
            refreshTemplates();
            $scope.isCreateTemplate = false;
        }

        $scope.viewTemplate = function(template) {
            $scope.singleTemplate = template;
            $scope.isViewTemplate = true;
        };

        $scope.closeViewTemplate = function() {
            refreshTemplates();
            $scope.isViewTemplate = false;
        }
    });