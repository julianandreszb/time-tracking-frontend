function initializeDialogInformationData(responseData) {
    if (!!responseData.status) {
        this.dialogInformationTitle = responseData.status;
    }
    if (!!responseData.message) {
        this.dialogInformationText = responseData.message;
    }
}

function openDialogInformation() {
    if (typeof this.dialogInformationIsOpen !== 'undefined') {
        this.dialogInformationIsOpen = true
    }
}

function closeDialogInformation() {
    if (typeof this.dialogInformationIsOpen !== 'undefined') {
        this.dialogInformationIsOpen = false;
    }
}

export {openDialogInformation, closeDialogInformation, initializeDialogInformationData}
