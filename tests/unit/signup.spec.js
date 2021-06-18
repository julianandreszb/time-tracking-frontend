import {createLocalVue, RouterLinkStub, mount, shallowMount} from '@vue/test-utils'
import SignUp from "@/views/SignUp";
import DialogInformation from "@/components/DialogInformation";
import Vuetify from "vuetify";
import store from "@/store/store";
import moxios from 'moxios'
import axios from "axios";
import 'intersection-observer';

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

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall()
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

    test('fill valid values into form input fields', async () => {

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

        await wrapper.vm.$nextTick();

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

    test('create new user', async () => {

        moxios.install();
        vuetify = new Vuetify()
        wrapper = shallowMount(SignUp, {
            localVue,
            vuetify,
            store,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        moxios.stubRequest('/api/register', {
            status: 200,
            response: {
                "status": "Success",
                "message":"User created successfully",
                "data": {
                    "name":"Julian Zapata",
                    "email":"JulianAndresZB@gmail.com",
                    "updated_at":"2021-06-16T04:27:58.000000Z",
                    "created_at":"2021-06-16T04:27:58.000000Z",
                    "id":1
                }
            }
        });

        axios.post('/api/register').then(async response => {
            wrapper.vm.DialogInformationTitle = response.data.status;
            wrapper.vm.DialogInformationText = response.data.message;
            wrapper.vm.showDialogInformation = true;

            await wrapper.vm.$nextTick();

            expect(wrapper.findComponent(DialogInformation).html()).toContain('Success'); // Status
            expect(wrapper.findComponent(DialogInformation).html()).toContain('User created successfully'); // message

        });
    });

    function signUpFormContent() {
        return wrapper.getComponent({ref: 'form'}).html();
    }

});
