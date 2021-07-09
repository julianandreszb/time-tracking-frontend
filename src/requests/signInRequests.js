import apiClient from "@/requests/apiClient";

async function handleSignInRequest(user) {

    try {

        this.openDialogLoading();

        const signInResponse = await this.signInRequest(user);

        // TODO: This function is not required for SignIn component.
        // TODO: Check if there is way to change the names to the functions for signIn and signUp respectively
        // TODO: (Function inside another function let that = this)
        //this.handleUserAuthSuccessResponse(signInResponse); // TODO: import and use method in SIgnIn component

        this.closeDialogLoading();

    } catch (error) {
        this.handleUserAuthErrorResponse(error);
    }
}

async function signInRequest(user) {

    const {email, password} = user;

    await apiClient.get('/sanctum/csrf-cookie');

    return apiClient.post('/api/login', {
        email: email,
        password: password,
    });
}

export {
    signInRequest, handleSignInRequest
}
