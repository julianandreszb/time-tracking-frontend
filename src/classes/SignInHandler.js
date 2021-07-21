import apiClient from "@/requests/apiClient";

class AuthHandler {
    constructor() {
    }

    signInRequest(user) {

        return apiClient.post('/api/login', {
            email: user.email,
            password: user.password,
        });
    }

    async signUpRequest(user) {

        return apiClient.post('/api/register', {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.passwordConfirmation,
        });
    }


}

export default AuthHandler;
