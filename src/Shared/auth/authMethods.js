function handleUserAuthErrorResponse(error) {

    this.logMessage("handleUserAuthErrorResponse.error.response", error.response);

    this.closeDialogLoading();

    this.initializeDialogErrorData(error.response.data);

    this.openDialogError();
}

function handleUserAuthSuccessResponse(response) {

    this.logMessage("handleUserAuthSuccessResponse.response", response);

    this.closeDialogLoading();

    this.initializeDialogInformationData(response.data);

    this.openDialogInformation();
}

export {
    handleUserAuthErrorResponse,
    handleUserAuthSuccessResponse
};
