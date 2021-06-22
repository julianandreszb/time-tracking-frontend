import apiClient from "@/services/apiServices";

async function loginUserAsync(email, password) {
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
    loginUserAsync
}
