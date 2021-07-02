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

export {openDialogInformation, closeDialogInformation}
