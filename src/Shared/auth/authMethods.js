function handleUserAuthErrorResponse(error) {

    this.logMessage("handleUserAuthErrorResponse.error.response", error.response);

    this.initializeDialogErrorData(error.response.data);

    this.openDialogError();
}

function handleUserAuthSuccessResponse(response) {

    this.logMessage("handleUserAuthSuccessResponse.response", response);

    this.initializeDialogInformationData(response.data);

    this.openDialogInformation();
}

function handleRequestError(error) {

    this.logMessage("handleRequestError.error", error);

    this.initializeDialogErrorData(error);

    this.openDialogError();

}

export {
    handleUserAuthErrorResponse,
    handleUserAuthSuccessResponse,
    handleRequestError
};
