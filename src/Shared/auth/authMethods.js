function handleUserAuthErrorResponse(error) {
    this.isDebugEnabled && console.log(`handleUserRegistrationErrorResponse.error.response`, error.response);
    this.closeDialogLoading();

    if (!!error.response.data.message) {
        this.dialogErrorTitle = error.response.data.message;
    }

    if (!!error.response.data.errors) {
        this.dialogErrorJson = error.response.data.errors;
    }

    this.openDialogError();

    return false;

}

function handleUserAuthSuccessResponse(response) {
    this.isDebugEnabled && console.log(`handleUserRegistrationSuccessResponse.response`, response);
    this.closeDialogLoading();

    if (!!response) {
        if (!!response.data.status) {
            this.dialogInformationTitle = response.data.status;
        }
        if (!!response.data.message) {
            this.dialogInformationText = response.data.message;
        }

        this.openDialogInformation();
    }
}

export {
    handleUserAuthErrorResponse,
    handleUserAuthSuccessResponse
};
