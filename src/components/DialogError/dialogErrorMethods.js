function initializeDialogErrorData(errorData) {
    if (!!errorData.message) {
        this.dialogErrorTitle = errorData.message;
    }

    if (!!errorData.errors) {
        this.dialogErrorJson = errorData.errors;
    }
}

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

export {initializeDialogErrorData, openDialogError, closeDialogError}
