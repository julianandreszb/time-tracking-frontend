import apiClient from "@/requests/apiClient";

class CsrfCookieAuth {
    constructor() {
    }

    csrfCookieRequest() {
        return apiClient.get('/sanctum/csrf-cookie');
    }

    async initializeCsrfCookie() {
        await this.csrfCookieRequest();
    }
}

export default CsrfCookieAuth;
