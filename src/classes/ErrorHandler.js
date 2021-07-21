import Debug from "@/classes/Debug";

class ErrorHandler {
    constructor() {
        this.debug = new Debug();
    }

    handleUserAuthErrorResponse(error) {
        this.debug.logMessage("handleUserAuthErrorResponse.error.response", error.response);
    }

    handleRequestError(error) {
        this.debug.logMessage("handleRequestError.error", error);
    }

    handleSettingUpError(error) {
        this.debug.logMessage("handleSettingUpError.error.message", error.message);
    }
}

export default ErrorHandler;
