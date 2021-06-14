import {createLocalVue, RouterLinkStub, mount} from '@vue/test-utils'
import SignUp from "@/views/SignUp";
import Vuetify from "vuetify";
import store from "@/store/store";

describe('SignUp', () => {

    const localVue = createLocalVue();
    let vuetify
    let wrapper;

    beforeEach(() => {
        vuetify = new Vuetify()
        wrapper = mount(SignUp, {
            localVue,
            vuetify,
            store,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
    });

    test('snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('default signup form field values', () => {
        expect(wrapper.vm.name).toBe('');
        expect(wrapper.vm.email).toBe('');
        expect(wrapper.vm.password).toBe('');
        expect(wrapper.vm.passwordConfirmation).toBe('');
    });

    test('required field messages', async () => {

        wrapper.setData({
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        });

        await wrapper.find('#v-btn-signup').trigger('click');
        const signUpFormHtml = signUpFormContent();

        expect(signUpFormHtml).toContain('Name is required');
        expect(signUpFormHtml).toContain('E-mail is required');
        expect(signUpFormHtml).toContain('Password is required');
        expect(signUpFormHtml).toContain('Password Confirmation is required');

    });

    test('fill valid values into form input fields', () => {

        const wrapperName = wrapper.find('#v-text-field-name');
        const wrapperEmail = wrapper.find('#v-text-field-email');
        const wrapperPassword = wrapper.find('#v-text-field-password');
        const wrapperPasswordConfirm = wrapper.find('#v-text-field-confirm-password');

        wrapperName.element.value = 'Neil DeGrasse Tyson';
        wrapperEmail.element.value = 'neil_degrasse_tyson@test.com';
        wrapperPassword.element.value = 'ABC123456789';
        wrapperPasswordConfirm.element.value = 'ABC123456789';

        wrapperName.trigger('input');
        wrapperEmail.trigger('input');
        wrapperPassword.trigger('input');
        wrapperPasswordConfirm.trigger('input');

        wrapper.find('#v-btn-signup').trigger('click'); // wrapper.vm.$refs.form.validate();

        expect(wrapper.vm.name).toBe('Neil DeGrasse Tyson');
        expect(wrapper.vm.email).toBe('neil_degrasse_tyson@test.com');
        expect(wrapper.vm.password).toBe('ABC123456789');
        expect(wrapper.vm.passwordConfirmation).toBe('ABC123456789');

        const signUpFormHtml = signUpFormContent();
        expect(signUpFormHtml).not.toContain('Name is required');
        expect(signUpFormHtml).not.toContain('E-mail is required');
        expect(signUpFormHtml).not.toContain('Password is required');
        expect(signUpFormHtml).not.toContain('Password Confirmation is required');
        expect(signUpFormHtml).not.toContain('Password must match');

    });

    function signUpFormContent() {
        return wrapper.getComponent({ref: 'form'}).html();
    }

});
