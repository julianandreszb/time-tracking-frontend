function openDialogLoading() {
    if (typeof this.dialogLoadingIsOpen !== 'undefined') {
        this.dialogLoadingIsOpen = true
    }
}

function closeDialogLoading() {
    if (typeof this.dialogLoadingIsOpen !== 'undefined') {
        this.dialogLoadingIsOpen = false;
    }
}

export {openDialogLoading, closeDialogLoading}
