function openDialogInformation() {
    if (typeof this.showDialogInformation !== 'undefined') {
        this.showDialogInformation = true
    }
}

function closeDialogInformation() {
    if (typeof this.showDialogInformation !== 'undefined') {
        this.showDialogInformation = false;
    }
}

export default {openDialogInformation, closeDialogInformation}
