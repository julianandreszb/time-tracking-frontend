let showPassword = false;
let showPasswordConfirm = false;
let valid = true;
let name = '';
let nameRules = [
    v => !!v || 'Name is required',
    v => (v && v.length <= 20) || 'Name must be less than 10 characters',
];
let email = '';
let emailRules = [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];
let password = '';
let passwordRules = [
    v => !!v || 'Password is required'
];
let passwordConfirmation = '';
let passwordConfirmationRules = {
    required: v => !!v || 'Password Confirmation is required'
};
const signUpData = {
    showPassword,
    showPasswordConfirm,
    valid,
    name,
    nameRules,
    email,
    emailRules,
    password,
    passwordRules,
    passwordConfirmation,
    passwordConfirmationRules
};

const signInData = {
    showPassword,
    valid,
    email,
    emailRules,
    password,
    passwordRules,
};

export {signUpData, signInData};
