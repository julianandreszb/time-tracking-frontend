function showDialogLoading() {
    if (typeof this.displayDialogLoading !== 'undefined') {
        this.displayDialogLoading = true
    }
}

function hideDialogLoading() {
    if (typeof this.displayDialogLoading !== 'undefined') {
        this.displayDialogLoading = false;
    }
}

export {showDialogLoading, hideDialogLoading}
