angular.module("myApp")
/**
 * Service for groups
 */
    .service("GroupsService", function ($http) {

        /**
         * Method to get all groups
         * @param token
         * @returns {JSON} groups
         */
        this.getGroups = function (token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/group?userToken=" + token
            });
        };

        /**
         * Method to get single group
         * @param token
         * @param id
         * @returns {JSON} group
         */
        this.getSingleGroup = function (token, id) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/group/single?userToken=" + token + "&id=" + id
            });
        };

        /**
         * Method to create new group
         * @param token
         * @param tid
         * @param title
         * @param deadline
         * @param grade
         * @param members
         */
        this.newGroup = function (token, tid, title, deadline, grade, members) {
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

        /**
         * Method to delete a group
         * @param token
         * @param group
         */
        this.deleteGroup = function (token, group) {
            let data = {
                token: token,
                groupId: group.id
            };
            return $http({
                method: 'DELETE',
                url: "http://localhost:8080/v1/group/delete?userToken=" + data.token + "&groupId=" + data.groupId
            });
        };

        /**
         * Method to approve a group
         * @param token
         * @param group
         */
        this.approveGroup = function (token, group) {
            let data = {
                token: token,
                groupId: group.id
            };
            return $http({
                method: 'PUT',
                url: "http://localhost:8080/v1/group/approve?userToken=" + data.token + "&id=" + data.groupId
            });
        };


        /**
         * Method to get pdf from group
         * @param token
         * @param group
         * @return {File} pdf with overview
         */
        this.downloadPDF = function (token, group) {
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

        /**
         * Method to set a group and send mail to members
         * @param token
         * @param group
         */
        this.openGroupAndSendMail = function (token, group) {
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