function openDialogError() {
    if (typeof this.dialogErrorIsOpen !== 'undefined') {
        this.dialogErrorIsOpen = true
    }
}

function closeDialogError() {
    if (typeof this.dialogErrorIsOpen !== 'undefined') {
        this.dialogErrorIsOpen = false;
    }
}

export {openDialogError, closeDialogError}
