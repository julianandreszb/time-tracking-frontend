import apiClient from "@/services/apiServices";

async function createUserAsync(name, email, password, passwordConfirmation) {
    return apiClient
        .get('/sanctum/csrf-cookie')
        .then(() => {
            return apiClient.post('/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            });
        });
}


export {
    createUserAsync
}
