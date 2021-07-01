function showDialogError() {
    if (typeof this.displayDialogError !== 'undefined') {
        this.displayDialogError = true
    }
}

function hideDialogError() {
    if (typeof this.displayDialogError !== 'undefined') {
        this.displayDialogError = false;
    }
}

export {showDialogError, hideDialogError}
