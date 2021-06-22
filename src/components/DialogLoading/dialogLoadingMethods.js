function openDialogLoading() {
    if (typeof this.showDialogLoading !== 'undefined') {
        this.showDialogLoading = true
    }
}

function closeDialogLoading() {
    if (typeof this.showDialogLoading !== 'undefined') {
        this.showDialogLoading = false;
    }
}

export default {openDialogLoading, closeDialogLoading}
