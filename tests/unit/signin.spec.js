import {createLocalVue, mount, RouterLinkStub} from '@vue/test-utils'
import Vuetify from "vuetify";
import SignIn from "@/views/SignIn";
import store from "@/store/store";

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


        // const wrapperPassword = wrapper.find('[data-testid="password"]');
        // wrapperPassword.element.value = '';

        // wrapper.find('[data-testid="sign-in"]')
        // wrapper.find('[data-testid="sign-up"]')

    });

    function signInFormContent() {
        return wrapper.getComponent({ref: 'form'}).html();
    }
});
