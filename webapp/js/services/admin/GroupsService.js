angular.module("myApp")
    .service("GroupsService", function($http) {
        this.getGroups = function(token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/group?userToken="+token
            });
        };

        this.newGroup = function(token, tid, title, deadline, grade, members) {
            let data = {
                token: token,
                templateId: tid,
                name: title,
                deadline: deadline,
                groupGrade: grade,
                members: members
            };
            return $http({
                method: 'PUT',
                url: "http://localhost:8080/v1/group/create",
                data: data
            });
        };

        this.deleteGroup = function(token, group) {
            let data = {
                token: token,
                groupId: group.id
            };
            return $http({
                method: 'DELETE',
                url: "http://localhost:8080/v1/group/delete?userToken=" + data.token + "&groupId=" + data.groupId
            });
        };

        this.approveGroup = function(token, group) {
            let data = {
                token: token,
                groupId: group.id
            };
            return $http({
                method: 'PUT',
                url: "http://localhost:8080/v1/group/approve?userToken=" + data.token + "&id=" + data.groupId
            });
        };

        this.downloadPDF = function(token, group) {
            let data = {
                token: token,
                groupId: group.id
            };
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/group/pdf?userToken=" + data.token + "&id=" + data.groupId,
                responseType: 'arraybuffer'
            });
        };

        this.openGroupAndSendMail = function(token, group) {
            let data = {
                userToken: token,
                groupId: group.id
            };
            return $http({
                method: 'PUT',
                url: "http://localhost:8080/v1/mail/sendRequest",
                data: data
            });
        }
    });