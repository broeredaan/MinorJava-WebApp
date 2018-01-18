angular.module("myApp")
    .controller("GroupsCtrl", function($scope, GroupsService, $timeout, $location, $cookies) {
        if($cookies.get("token") == null) {
            $location.path("/");
        }
        $scope.loading = true;
        $scope.grade = 7;
        $scope.groupName = "";
        $scope.state = "general";
        $scope.title = "Create new group";
        $scope.$emit('updateMenu', true);

        $scope.errorMessage = "";

        $scope.name = "";
        $scope.email = "";

        $scope.newPersons = [];

        refreshGroups();

        function refreshGroups() {
            $scope.loading = true;
            GroupsService.getGroups($cookies.get("token")).then(function(data) {
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

        $scope.next = function(name, grade) {
            console.log(name);
            console.log(grade);
            if(name == "" || name == null) {
                $scope.errorMessage = "Please fill in a title";
            }
            else if(grade < 1 || grade > 10 || grade == null || !angular.isNumber(grade)) {
                $scope.errorMessage = "Please fill in a proper grade";
            }
            else {
                $scope.grade = grade;
                $scope.groupName = name;
                $scope.state = "members";
                $scope.title = name;
                $scope.errorMessage = "";
            }
        };

        $scope.previous = function() {
            $scope.errorMessage = "";
            $scope.state = "general";
            $scope.title = "Create new group";
        };

        $scope.submit = function() {
            if($scope.newPersons.length < 2) {
                $scope.errorMessage = "There are not enough members added to the group."
            }
            else {
                console.log($scope.newPersons);
                $scope.errorMessage = "";
            }

        };

        $scope.changeGrade = function(grade) {
            $scope.grade = grade;
            console.log(grade);
        };

        $scope.changeGroupName = function(name) {
            console.log(name);
            $scope.groupName = name;
        };
    });