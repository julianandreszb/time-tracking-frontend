import apiClient from "@/requests/apiClient";


function csrfCookieRequest() {
    return apiClient.get('/sanctum/csrf-cookie');
}

async function initializeCsrfCookie() {

    if (!this.isCsrfCookieSettled) {
        await this.csrfCookieRequest();
        this.setCsrfCookieSettled(true);
    }

    return this.isCsrfCookieSettled;
}

export {csrfCookieRequest, initializeCsrfCookie}
