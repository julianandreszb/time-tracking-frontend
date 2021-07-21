import User from "@/classes/User";

class UserSignUp extends User {
    constructor(data) {
        super(data);
        this.name = data.name
        this.passwordConfirmation = data.passwordConfirmation
    }
}

export default UserSignUp;
