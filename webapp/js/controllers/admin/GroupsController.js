angular.module("myApp")
/**
 * Controller for the hangroups
 */
    .controller("GroupsCtrl", function ($scope, GroupsService, TemplateService, LoginService, ModalService, $timeout, $location, $cookies, LangService) {
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

        LangService.getLang().then(res => {
            $scope.lang = res;
        });

        refreshGroups();

        /**
         * Function to refresh the groups overciew
         */
        function refreshGroups() {
            $scope.loading = true;
            GroupsService.getGroups($cookies.get("token")).then(function (data) {
                    $scope.groups = data.data;

                    $timeout(function () {
                        $scope.loading = false;
                    }, 750);

                    //Calculate completion
                    if ($scope.groups != null) {
                        $scope.groups.forEach(group => {
                            let progress = 0;
                            group.groupMembers.forEach(member => {
                                if (member.hasSubmitted) {
                                    progress += 1;
                                }
                            });
                            group.progress = ((100 / group.groupMembers.length) * progress);
                        });
                    }
                },
                /**
                 * Function to handle errors
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
         * Function to refresh the info of a single group
         * @param id
         */
        function refreshSingleGroup(id) {
            $scope.loading = true;
            GroupsService.getSingleGroup($cookies.get("token"), id).then(function (data) {
                    let group = data.data;
                    let progress = 0;
                    //Calculate progress
                    group.groupMembers.forEach(member => {
                        if (member.hasSubmitted) {
                            progress += 1;
                        }
                    });
                    group.progress = ((100 / group.groupMembers.length) * progress);
                    $scope.singleGroup = group;
                    $timeout(function () {
                        $scope.loading = false;
                    }, 750)
                },
                /**
                 * Function to handle errors
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
         * Function to refresh the templates overview
         */
        function refreshTemplates() {
            TemplateService.getTemplates($cookies.get("token")).then(function (data) {
                $scope.templates = data.data;
            }, function (error) {
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
         * Function to validate email
         * @param email
         * @returns {boolean}
         */
        function validateEmail(email) {
            //Regex to validate email
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        }

        /**
         * Function to create a group
         */
        $scope.createGroup = function () {
            refreshTemplates();
            $scope.grade = 7;
            $scope.groupName = "";
            $scope.state = "general";
            $scope.title = "Create new group";
            $scope.$emit('updateMenu', true);
            $scope.deadline = null;
            $scope.selectedTemplate = null;

            $scope.errorMessage = "";

            $scope.name = "";
            $scope.email = "";

            $scope.newPersons = [];
            $scope.isCreateGroup = true;
        };

        /**
         * Function to close the createGroup scope
         */
        $scope.closeCreateGroup = function () {
            refreshGroups();
            $scope.isCreateGroup = false;
        };

        /**
         * Function to open the view of a single group.
         * @param group
         */
        $scope.viewGroup = function (group) {
            refreshSingleGroup(group.id);
            $scope.isViewGroup = true;
        };

        /**
         * Method to close the view of a group
         */
        $scope.closeViewGroup = function () {
            refreshGroups();
            $scope.isViewGroup = false;
        };

        /**
         * Method to add persons to the list in the group creation
         * @param name
         * @param email
         */
        $scope.addPersonToList = function (name, email) {
            $scope.errorMessage = "";
            if (name !== "" && email !== "") {
                //Check for duplicates
                let duplicate = false;
                for (let i = 0; i < $scope.newPersons.length; i++) {
                    if ($scope.newPersons[i].email === email) {
                        duplicate = true;
                    }
                }
                if (duplicate) {
                    $scope.errorMessage = "This email has already been used."
                }
                else {
                    //validate mail
                    if (validateEmail(email)) {
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

        /**
         * Function to remove a person from the list
         * @param index
         */
        $scope.removePersonFromList = function (index) {
            $scope.newPersons.splice(index, 1);
        };

        /**
         * Function to go to the next part of the group creation
         * @param tid
         * @param name
         * @param deadline
         * @param grade
         */
        $scope.next = function (tid, name, deadline, grade) {
            //Check if all required values are set
            if (name === "" || name === null) {
                $scope.errorMessage = "Please fill in a title";
            }
            else if (grade < 1 || grade > 10 || grade == null || !angular.isNumber(grade)) {
                $scope.errorMessage = "Please fill in a proper grade";
            }
            else if (tid == null) {
                $scope.errorMessage = "No template is selected";
            }
            else if (deadline.date == null) {
                $scope.errorMessage = "Please fill in a date";
            }
            else if (deadline.time == null) {
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

        /**
         * Function to go to the previous part of the creation process.
         */
        $scope.previous = function () {
            $scope.errorMessage = "";
            $scope.state = "general";
            $scope.title = "Create new group";
        };

        /**
         * Function to submit the new group
         * @param tid
         * @param title
         * @param deadline
         * @param grade
         */
        $scope.submit = function (tid, title, deadline, grade) {
            //Check if all required values are set
            if ($scope.newPersons.length < 2) {
                $scope.errorMessage = "There are not enough members added to the group."
            }
            else if (title == null || title == "") {
                $scope.errorMessage = "Please fill in a Group name";
            }
            else if (grade == null || grade < 1 || grade > 10) {
                $scope.errorMessage = "Please fill in a proper number from 1 to 10";
            }
            else {
                //Set the dates in right format
                let properDate = (deadline.date.getFullYear() + "-" + (deadline.date.getMonth() + 1) + "-" + deadline.date.getDate());
                let properTime = (deadline.time.getHours() + ":" + deadline.time.getMinutes() + ":" + deadline.time.getSeconds());
                let newDate = properDate + " " + properTime;
                GroupsService.newGroup($cookies.get("token"), tid, title, newDate, grade, $scope.newPersons).then(function (res) {
                        $scope.isCreateGroup = false;
                        refreshGroups();
                    },
                    //Error handling
                    function (error) {
                        if (error.status === 401) {
                            LoginService.checkLogin(true);
                        }
                        else {
                            ModalService.showModal("Error", "Something went wrong while creating a new group");
                        }
                    });
            }
        };

        /**
         * Method to delete group.
         * @param group
         */
        $scope.deleteGroup = function (group) {
            GroupsService.deleteGroup($cookies.get("token"), group).then(function (res) {
                    ModalService.showModal("Remove successful", "The group has been removed successfully");
                },
                //Error handling
                function (error) {
                    if (error.status === 401) {
                        LoginService.checkLogin(true);
                    }
                    else {
                        ModalService.showModal("Error", "Something went wrong while removing the group");
                    }
                });
        };

        /**
         * Method to approve group
         * @param group
         */
        $scope.approveGroup = function (group) {
            GroupsService.approveGroup($cookies.get("token"), group).then(function (res) {
                refreshSingleGroup(group.id);
                ModalService.showModal("Approval successful", "The group has been approved successfully");
            }, function (error) {
                if (error.status === 401) {
                    LoginService.checkLogin(true);
                }
                else {
                    ModalService.showModal("Error", "Unable to approve group");
                }
            });
        };


        /**
         * Method to get pdf for a group
         * @param group
         */
        $scope.downloadPDF = function (group) {
            GroupsService.downloadPDF($cookies.get("token"), group).then(function (data) {
                    let file = new Blob([data.data], {type: 'application/pdf'});
                    saveAs(file, group.name + "(id_" + group.id + ").pdf");
                },
                /**
                 * Error handling function
                 */
                function (error) {
                    if (error.status === 401) {
                        LoginService.checkLogin(true);
                    }
                    else {
                        ModalService.showModal("Error", "Unable to download pdf");
                    }
                });
        };

        /**
         * Method to set group and send mail
         * @param group
         */
        $scope.openGroupAndSendMail = function (group) {
            GroupsService.openGroupAndSendMail($cookies.get("token"), group).then(function (res) {
                    refreshSingleGroup(group.id);
                    ModalService.showModal("Mail successful", "The mails have been sent successfully");
                },
                /**
                 * Error handling function
                 */
                function (error) {
                    if (error.status === 401) {
                        LoginService.checkLogin(true);
                    }
                    else {
                        ModalService.showModal("Error", "Unable to send mails");
                    }
                });
        }

    });