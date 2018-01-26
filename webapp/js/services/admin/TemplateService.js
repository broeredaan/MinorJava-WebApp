angular.module("myApp")
/**
 * Service for templates
 */
    .service("TemplateService", function($http) {

        /**
         * Get all templates
         * @param token
         * @returns {JSON} templates
         */
        this.getTemplates = function(token) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/template?userToken="+token
            });
        };

        /**
         * Get a single template
         * @param token
         * @param id
         * @returns {JSON} template
         */
        this.getSingleTemplate = function(token, id) {
            return $http({
                method: 'GET',
                url: "http://localhost:8080/v1/template/single?userToken="+token+"&id="+id
            });
        };

        /**
         * Create new template
         * @param grade
         * @param desc
         * @param title
         * @param token
         */
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

        /**
         * Function to delete template
         * @param token
         * @param template
         */
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