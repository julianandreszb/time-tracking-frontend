function openDialogError() {
    if (typeof this.showDialogError !== 'undefined') {
        this.showDialogError = true
    }
}

function closeDialogError() {
    if (typeof this.showDialogError !== 'undefined') {
        this.showDialogError = false;
    }
}

export default {openDialogError, closeDialogError}
