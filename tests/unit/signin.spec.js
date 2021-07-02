import {createLocalVue, mount, RouterLinkStub, shallowMount} from '@vue/test-utils'
import Vuetify from "vuetify";
import SignIn from "@/views/SignIn";
import DialogLoading from "@/components/DialogLoading/DialogLoading";
import store from "@/store/store";
import moxios from "moxios";
import axios from "axios";
import DialogError from "@/components/DialogError/DialogError";
import DialogInformation from "@/components/DialogInformation/DialogInformation";
import ErrorListHelper from "@/components/ErrorListHelper/ErrorListHelper";
import 'intersection-observer';

describe('SignIn', () => {

    const localeVue = createLocalVue();
    let vuetify;
    let wrapper;

    beforeEach(() => {

        vuetify = new Vuetify();

        wrapper = mount(SignIn, {
            localeVue,
            vuetify,
            store,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
    });

    test('form fields exist', () => {
        expect(wrapper.find('[data-testid="email"]').exists()).toBeTruthy();
        expect(wrapper.find('[data-testid="password"]').exists()).toBeTruthy();
        expect(wrapper.find('[data-testid="sign-in"]').exists()).toBeTruthy();
        expect(wrapper.find('[data-testid="sign-up"]').exists()).toBeTruthy();
        expect(wrapper.find('[data-testid="dialog-error"]').exists()).toBeTruthy();
    });

    test('dialogs and methods components exist', () => {

        wrapper = shallowMount(SignIn, {
            localeVue,
            vuetify,
            store,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        expect(wrapper.findComponent(DialogLoading).exists()).toBeTruthy();
        expect(wrapper.findComponent(DialogInformation).exists()).toBeTruthy();
        expect(wrapper.findComponent(DialogError).exists()).toBeTruthy();
        expect(wrapper.findComponent(ErrorListHelper).exists()).toBeTruthy();

    });

    test('submitSignInForm method is called', async () => {
        const spy = jest.spyOn(wrapper.vm, 'submitSignInForm');

        wrapper.vm.submitSignInForm();
        expect(spy).toHaveBeenCalled();

        spy.mockReset();
    });

    test('form fields validation rules', async () => {

        let signInFormContentHtml;
        const wrapperEmail = wrapper.find('[data-testid="email"]');
        const wrapperSignInButton = wrapper.find('[data-testid="sign-in"]');

        //<editor-fold desc="Test email required">
        wrapperEmail.element.value = '';
        wrapperEmail.trigger('input');
        wrapperSignInButton.trigger('click');

        await wrapper.vm.$nextTick();

        signInFormContentHtml = signInFormContent();
        expect(signInFormContentHtml).toContain('E-mail is required');
        //</editor-fold>

        //<editor-fold desc="Test email format">
        wrapperEmail.element.value = 'test';
        wrapperEmail.trigger('input');
        wrapperSignInButton.trigger('click');

        await wrapper.vm.$nextTick();

        signInFormContentHtml = signInFormContent();
        expect(signInFormContentHtml).toContain('E-mail must be valid');

        wrapperEmail.element.value = 'test@test';
        wrapperEmail.trigger('input');
        wrapperSignInButton.trigger('click');

        await wrapper.vm.$nextTick();

        signInFormContentHtml = signInFormContent();
        expect(signInFormContentHtml).toContain('E-mail must be valid');

        wrapperEmail.element.value = 'test@test.com';
        wrapperEmail.trigger('input');
        wrapperSignInButton.trigger('click');

        await wrapper.vm.$nextTick();

        signInFormContentHtml = signInFormContent();
        expect(signInFormContentHtml).not.toContain('E-mail must be valid');
        //</editor-fold>

        //<editor-fold desc="Test password required">
        const wrapperPassword = wrapper.find('[data-testid="password"]');
        wrapperPassword.element.value = '';
        wrapperPassword.trigger('input');
        wrapperSignInButton.trigger('click');

        await wrapper.vm.$nextTick();

        signInFormContentHtml = signInFormContent();
        expect(signInFormContentHtml).toContain('Password is required');
        //</editor-fold>

        //<editor-fold desc="Test valid password">
        wrapperPassword.element.value = '123456789';
        wrapperPassword.trigger('input');
        wrapperSignInButton.trigger('click');

        await wrapper.vm.$nextTick();

        signInFormContentHtml = signInFormContent();
        expect(signInFormContentHtml).not.toContain('Password is required');
        //</editor-fold>

    });

    test('stub login user request', async () => {
        moxios.install();
        moxios.stubRequest('/api/login', {
            status: 200,
            response: {
                "status": "Error",
                "message":"Failed to authenticate user. The given data was invalid.",
                "data": []
            }
        });

        axios.post('/api/login', {
            email: 'test@test.com',
            password: '123456789-not-valid'

        }).then(async response => {
            console.log('stub./api/login.response', response);

            await wrapper.vm.$nextTick();

            // expect(wrapper.find('[data-testid="dialog-information"]').exists()).toBeTruthy();

        });

    });

    function signInFormContent() {
        return wrapper.getComponent({ref: 'form'}).html();
    }
});
