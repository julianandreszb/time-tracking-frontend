function handleUserAuthErrorResponse(error) {
    this.isDebugEnabled && console.log(`handleUserRegistrationErrorResponse.error.response`, error.response);
    this.hideDialogLoading();

    if (!!error.response.data.message) {
        this.dialogErrorTitle = error.response.data.message;
    }

    if (!!error.response.data.errors) {
        this.dialogErrorJson = error.response.data.errors;
    }

    this.showDialogError();

    return false;

}

function handleUserAuthSuccessResponse(response) {
    this.isDebugEnabled && console.log(`handleUserRegistrationSuccessResponse.response`, response);
    this.hideDialogLoading();

    if (!!response) {
        if (!!response.data.status) {
            this.dialogInformationTitle = response.data.status;
        }
        if (!!response.data.message) {
            this.dialogInformationText = response.data.message;
        }

        this.showDialogInformation();
    }
}

function handleSignUpSuccessResponse(response) {
    handleUserAuthSuccessResponse(response);
}

function handleSignUpErrorResponse(error) {
    handleUserAuthErrorResponse(error);
}

function handleSignInSuccessResponse(response) {
    handleUserAuthSuccessResponse(response);
}

function handleSignInErrorResponse(error) {
    handleUserAuthErrorResponse(error);
}

export {
    handleSignInErrorResponse,
    handleSignInSuccessResponse,
    handleSignUpErrorResponse,
    handleSignUpSuccessResponse
};
