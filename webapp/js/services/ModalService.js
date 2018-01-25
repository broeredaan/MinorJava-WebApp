angular.module("myApp").service("ModalService", function (LangService) {
    this.showModal = function (heading, text) {
        let modalBackground = angular.element("<div class='modal-background'></div>");
        let modalBody = angular.element("<div class='modal'></div>");
        let modalText = angular.element("<p class='modal-text'>" + text + "</p>");
        let modalHeading = angular.element("<h2 class='modal-heading'>" + heading + "</h2>");
        let closeButton = angular.element("<button class='btn modal-close' id='modal-close'>Close</button>");

        angular.element(document.getElementById('wrapper')).append(modalBackground);
        modalBody.append(modalHeading);
        modalBackground.append(modalBody);
        modalBody.append(modalText);
        modalBody.append(closeButton);
        closeButton.on('click', function () {
            modalBackground.remove();
        });
    }

});
