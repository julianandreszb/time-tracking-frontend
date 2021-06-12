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

        // .at(0) = SIGN UP button
        await wrapper.findAll('.v-btn').at(0).trigger('click');

        expect(wrapper.findAll('.v-messages__message').at(0).html()).toContain('Name is required');
        expect(wrapper.findAll('.v-messages__message').at(1).html()).toContain('E-mail is required');
        expect(wrapper.findAll('.v-messages__message').at(2).html()).toContain('Password is required');
        expect(wrapper.findAll('.v-messages__message').at(3).html()).toContain('Confirm Password is required');

    });

    test('fill form input fields', async () => {

        const wrapperName = wrapper.find('#v-text-field-name');
        wrapperName.element.value = 'Neil DeGrasse Tyson';
        wrapperName.trigger('input');

        await wrapper.findAll('.v-btn').at(0).trigger('click');

        expect(wrapper.vm.name).toBe('Neil DeGrasse Tyson');

        expect(wrapper.find('.v-messages__message').html()).not.toContain('Name is required');

    });

});
