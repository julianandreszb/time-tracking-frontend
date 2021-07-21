import apiClient from "@/requests/apiClient";

function handleSignInRequestError(error) {

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.message);

        this.handleUserAuthErrorResponse(error);

    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        console.log(error.message);

        this.handleRequestError(error);


    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);


}

async function handleSignInRequest(user) {

    try {

        this.openDialogLoading();

        await this.initializeCsrfCookie();

        const signInResponse = await this.SignInRequests.signInRequest(user);

        // TODO: This function is not required for SignIn component.
        // TODO: Check if there is way to change the names to the functions for signIn and signUp respectively
        // TODO: (Function inside another function let that = this)
        //this.handleUserAuthSuccessResponse(signInResponse); // TODO: import and use method in SIgnIn component

    } catch (error) {
        this.SignInRequests.handleSignInRequestError(error)
    } finally {
        this.closeDialogLoading();
    }
}

async function signInRequest(user) {

    const {email, password} = user;

    return apiClient.post('/api/login', {
        email: email,
        password: password,
    });
}

export default {
    handleSignInRequest,
    signInRequest,
    handleSignInRequestError
}
