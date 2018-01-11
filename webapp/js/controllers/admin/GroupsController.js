angular.module("myApp")
    .controller("GroupsCtrl", function($scope, GroupsService, $timeout) {
        $scope.loading = true;
        $scope.$emit('updateMenu', true);

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
        };

        $scope.createGroup = function() {
            console.log("create new group");
        }

        $scope.createGroup = function() {
            $scope.isCreateGroup = true;
            console.log("create new template");
        };

        $scope.closeCreateGroup = function() {
            refreshGroups();
            $scope.isCreateGroup = false;
        }

        $scope.viewGroup = function(group) {
            $scope.singleGroup = group;
            $scope.isViewGroup = true;
        };

        $scope.closeViewGroup = function() {
            refreshGroups();
            $scope.isViewGroup = false;
        }
    });