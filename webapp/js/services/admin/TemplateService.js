angular.module("myApp")
    .service("TemplateService", function($http) {
        this.getTemplates = function(token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/template?userToken="+token
            });
        };

        this.newTemplate = function(grade, desc, title, token) {
            return $http({
                method: 'PUT',
                url: "http://localhost:8080/v1/template/create",
                data: {
                    userToken: token,
                    name: title,
                    gradeDeviation: grade,
                    isCommentNeeded: desc
                }
            });
        };

        this.deleteTemplate = function(token, template) {
            let data = {
                token: token,
                groupId: template.id
            };
            return $http({
                method: 'DELETE',
                url: "http://localhost:8080/v1/template/delete?userToken=" + data.token + "&templateId=" + data.groupId
            });
        };
    });