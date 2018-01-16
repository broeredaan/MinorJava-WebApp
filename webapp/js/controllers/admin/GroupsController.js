angular.module("myApp")
    .controller("GroupsCtrl", function($scope, GroupsService, $timeout) {
        $scope.loading = true;
        $scope.grade = 7;
        $scope.$emit('updateMenu', true);

        $scope.errorMessage = "";

        $scope.name = "";
        $scope.email = "";

        $scope.newPersons = [];

        refreshGroups();

        function refreshGroups() {
            $scope.loading = true;
            GroupsService.getGroups().then(function(data) {
                $scope.groups = data.data;
                $timeout(function() {
                    $scope.loading = false;
                }, 750)

            }, function() {
                alert("Error getting data from server");
                $scope.loading = false;
            });
        }

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        }

        $scope.createGroup = function() {
            $scope.isCreateGroup = true;
        };

        $scope.closeCreateGroup = function() {
            refreshGroups();
            $scope.isCreateGroup = false;
        };

        $scope.viewGroup = function(group) {
            $scope.singleGroup = group;
            $scope.isViewGroup = true;
        };

        $scope.closeViewGroup = function() {
            refreshGroups();
            $scope.isViewGroup = false;
        };

        //New Template workings
        $scope.addPersonToList = function(name, email) {
            $scope.errorMessage = "";
            if(name != "" && email != "") {
                let duplicate = false;
                for(let i = 0; i < $scope.newPersons.length; i++) {
                    if($scope.newPersons[i].email == email) {
                        duplicate = true;
                    }
                }
                if(duplicate) {
                    $scope.errorMessage = "This email has already been used."
                }
                else {
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

            }
            else {
                $scope.errorMessage = "Please fill in a name and email";
            }

        };

        $scope.removePersonFromList = function(index) {
            $scope.newPersons.splice(index, 1);
        };

        $scope.submit = function() {
            if($scope.newPersons.length < 2) {
                $scope.errorMessage = "There are not enough members added to the group."
            }
            console.log($scope.newPersons);
            console.log($scope.withDescription);
            $scope.errorMessage = "";
        }
    });