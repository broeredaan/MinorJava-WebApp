angular.module("myApp")
    .controller("TemplatesCtrl", function($scope, TemplateService, $timeout) {
        $scope.loading = true;
        $scope.withDescription = false;
        $scope.$emit('updateMenu', true);

        $scope.errorMessage = "";

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
        }

        $scope.createTemplate = function() {
            $scope.isCreateTemplate = true;
        };

        $scope.closeCreateTemplate = function() {
            refreshTemplates();
            $scope.isCreateTemplate = false;
        };

        $scope.viewTemplate = function(template) {
            $scope.singleTemplate = template;
            $scope.isViewTemplate = true;
        };

        $scope.closeViewTemplate = function() {
            refreshTemplates();
            $scope.isViewTemplate = false;
        };

        //New Template workings
        $scope.changeGrade = function() {

        };

        $scope.changeWithDesciption = function() {
            $scope.withDescription = !$scope.withDescription;
        };

        $scope.addPersonToList = function(name, email) {
            $scope.errorMessage = "";
            if(name != "" && email != "") {
                if(validateEmail(email)) {
                    $scope.errorMessage = "";
                    $scope.newPersons.push({"name": name, "email": email});
                    $scope.name = "";
                    $scope.email = "";
                }
                else {
                    $scope.errorMessage = "Incorrect email."
                }
            }
            else {
                $scope.errorMessage = "Please fill in a name and email";
            }

        };

        $scope.removePersonFromList = function(index) {
            $scope.newPersons.splice(index, 1);
        };

        $scope.submit = function() {
            console.log($scope.grade);
            console.log($scope.withDescription);
        }
    });