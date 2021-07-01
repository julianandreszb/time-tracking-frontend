import apiClient from "@/requests/apiClient";

async function signUpRequest(user) {

    const {name, email, password, passwordConfirmation} = user;

    return apiClient
        .get('/sanctum/csrf-cookie')
        .then(() => {
            return apiClient.post('/api/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            });
        });
}

export {
    signUpRequest
}
