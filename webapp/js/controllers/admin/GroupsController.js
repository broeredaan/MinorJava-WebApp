angular.module("myApp")
    .controller("GroupsCtrl", function($scope, GroupsService, TemplateService, LoginService, ModalService, $timeout, $location, $cookies) {
        LoginService.checkLogin();
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
                }, 750);

                //Add some completion %
                if($scope.groups != null) {
                    $scope.groups.forEach(group => {
                        let progress = 0;
                        group.groupMembers.forEach(member => {
                            if(member.hasSubmitted) {
                                progress += 1;
                            }
                        });
                        group.progress = ((100 / group.groupMembers.length) * progress);
                    });
                }
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

        function refreshTemplates() {
            TemplateService.getTemplates($cookies.get("token")).then(function(data) {
                $scope.templates = data.data;
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

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        }

        $scope.createGroup = function() {
            refreshTemplates();
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

        $scope.next = function(tid, name, deadline, grade) {
            if(name == "" || name == null) {
                $scope.errorMessage = "Please fill in a title";
            }
            else if(grade < 1 || grade > 10 || grade == null || !angular.isNumber(grade)) {
                $scope.errorMessage = "Please fill in a proper grade";
            }
            else if(tid == null){
                $scope.errorMessage = "No template is selected";
            }
            else if(deadline.date == null) {
                $scope.errorMessage = "Please fill in a date";
            }
            else if(deadline.time == null) {
                $scope.errorMessage = "Please fill in a time";
            }
            else {
                $scope.grade = grade;
                $scope.groupName = name;
                $scope.deadline = deadline;
                $scope.selectedTemplate = tid;
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

        $scope.submit = function(tid, title, deadline, grade) {
            if($scope.newPersons.length < 2) {
                $scope.errorMessage = "There are not enough members added to the group."
            }
            else if(title == null || title == "") {
                $scope.errorMessage = "Please fill in a Group name";
            }
            else if(grade == null || grade < 1 || grade > 10) {
                $scope.errorMessage = "Please fill in a proper number from 1 to 10";
            }
            else {
                let properDate = (deadline.date.getUTCFullYear()+"-"+deadline.date.getUTCMonth()+"-"+deadline.date.getUTCDay());
                let properTime = (deadline.time.getUTCHours()+":"+deadline.time.getUTCMinutes()+":"+deadline.time.getUTCSeconds());
                let newDate = properDate + " " + properTime;
                GroupsService.newGroup($cookies.get("token"), tid, title, newDate, grade, $scope.newPersons).then(function(res) {
                    $scope.isCreateGroup = false;
                    refreshGroups();
                }, function(error) {
                    if(error.status === 401){
                        LoginService.checkLogin(true);
                    }
                    else {
                        $scope.errorMessage = "Something went wrong while creating a new group";
                    }
                });
            }
        };

        $scope.deleteGroup = function(group) {
            GroupsService.deleteGroup($cookies.get("token"), group).then(function(res) {
                console.log(res);
                ModalService.showModal("Remove successful", "The group has been removed successfully");
            }, function(error) {
                console.log(error);
                ModalService.showModal("Error", "Unable to remove group");
            });
        };

        $scope.approveGroup = function(group) {
            GroupsService.approveGroup($cookies.get("token"), group).then(function(res) {
                console.log(res);
                ModalService.showModal("Approval successful", "The group has been approved successfully");
            }, function(error) {
                console.log(error);
                ModalService.showModal("Error", "Unable to approve group");
            });
        };

        $scope.downloadPDF = function(group) {
            GroupsService.downloadPDF($cookies.get("token"), group).then(function(data) {
                console.log(data);
                let file = new Blob([data.data], { type: 'application/pdf' });
                saveAs(file, group.name + "(id_" + group.id + ").pdf");

            }, function(error) {
                console.log(error);
                ModalService.showModal("Error", "Unable to download pdf");
            });
        };

        $scope.openGroupAndSendMail = function(group) {
            GroupsService.openGroupAndSendMail($cookies.get("token"), group).then(function(res) {
                console.log(res);
                ModalService.showModal("Mail successful", "The mails have been sent successfully");
            }, function(error) {
                console.log(error);
                ModalService.showModal("Error", "Unable to send mails");
            });
        }

    });