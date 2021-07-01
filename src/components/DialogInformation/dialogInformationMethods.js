function showDialogInformation() {
    if (typeof this.displayDialogInformation !== 'undefined') {
        this.displayDialogInformation = true
    }
}

function hideDialogInformation() {
    if (typeof this.displayDialogInformation !== 'undefined') {
        this.displayDialogInformation = false;
    }
}

export {showDialogInformation, hideDialogInformation}
