angular.module("myApp").service("ModalService", function () {
    this.showModal = function (text) {
        let modalBackground = angular.element("<div class='modal-background'></div>");
        let modalBody = angular.element("<div class='modal'></div>");
        let modalText = angular.element("<p>" + text + "</p>");
        let closeButton = angular.element("<button class='btn modal-close' id='modal-close'>Close</button>");

        angular.element(document.getElementById('wrapper')).append(modalBackground);
        modalBackground.append(modalBody);
        modalBody.append(modalText);
        modalBody.append(closeButton);
        closeButton.on('click', function () {
            modalBackground.remove();
        });
    }

});
