angular.module("myApp")
    .service("GroupsService", function($http) {
        this.getGroups = function(token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/group?userToken="+token
            });
        };

        this.newGroup = function(token, tid, title, deadline, grade) {
            return $http({
                method: 'PUT',
                url: "http://localhost:8080/v1/group/create",
                data: {
                    userToken: token,
                    templateId: tid,
                    name: title,
                    deadline: deadline,
                    groupGrade: grade
                }
            });
        }
    });