import apiClient from "@/requests/apiClient";

async function handleSignUpRequest(user) {

    try {

        this.openDialogLoading();

        const signUpResponse = await this.signUpRequest(user);

        this.handleUserAuthSuccessResponse(signUpResponse);

    } catch (error) {
        this.handleUserAuthErrorResponse(error);
    }
}


async function signUpRequest(user) {

    const {name, email, password, passwordConfirmation} = user;

    await apiClient.get('/sanctum/csrf-cookie');

    return apiClient.post('/api/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
    });
}

export {
    signUpRequest,
    handleSignUpRequest
}
