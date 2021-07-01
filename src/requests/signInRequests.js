import apiClient from "@/requests/apiClient";

async function signInRequest(user) {

    const {email, password} = user;

    return apiClient
        .get('/sanctum/csrf-cookie')
        .then(() => {
            return apiClient.post('/api/login', {
                email: email,
                password: password,
            });
        });
}

export {
    signInRequest
}
