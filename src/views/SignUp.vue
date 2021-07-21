<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>SIGN UP</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                  <v-text-field
                      prepend-icon="mdi-account"
                      id="v-text-field-name"
                      v-model="user.name"
                      :counter="20"
                      :rules="nameRules"
                      label="Name"
                      required
                  />
                  <v-text-field
                      prepend-icon="mdi-email"
                      id="v-text-field-email"
                      v-model="user.email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                  />
                  <v-text-field
                      prepend-icon="mdi-lock"
                      id="v-text-field-password"
                      v-model="user.password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="showPassword ? 'text' : 'password'"
                      label="Password"
                      counter
                      @click:append="showPassword = !showPassword"
                  ></v-text-field>
                  <v-text-field
                      prepend-icon="mdi-lock"
                      id="v-text-field-confirm-password"
                      v-model="user.passwordConfirmation"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[passwordConfirmationRules.required, passwordConfirmationRule]"
                      :type="showPassword ? 'text' : 'password'"
                      label="Confirm Password"
                      counter
                      @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn id="v-btn-signup" block color="primary" @click="submitSignUpForm">SIGN UP</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-spacer></v-spacer>
                <p class="my-2">Have already an account?</p>
                <v-btn
                    class="ma-1"
                    color="primary"
                    plain
                    to="/signin"
                >
                  Login here
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
          <DialogLoading
              :isOpen="dialogLoadingInstance.isOpen"
              :text="dialogLoadingInstance.text"
              :title="dialogLoadingInstance.title"
          />
          <DialogError
              :isOpen="dialogErrorInstance.isOpen"
              :text="dialogErrorInstance.text"
              :title="dialogErrorInstance.title"
              @close="dialogErrorInstance.close()"
              data-testid="dialog-error"
          >
            <ErrorListHelper v-if="helperErrorInstance.errorMap" :errorMap="helperErrorInstance.errorMap"/>
          </DialogError>
          <DialogInformation
              :isOpen="dialogInformationInstance.isOpen"
              :text="dialogInformationInstance.text"
              :title="dialogInformationInstance.title"
              @close="dialogInformationInstance.close()"
          />
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex'
import {signUpData} from '@/Shared/auth/authData'

import DialogLoading from "@/components/DialogLoading/DialogLoading";
import DialogError from "@/components/DialogError/DialogError";
import DialogInformation from "@/components/DialogInformation/DialogInformation";
import ErrorListHelper from "@/components/ErrorListHelper/ErrorListHelper";

import DialogLoadingClass from "@/classes/Dialog/DialogLoading";
import {DIALOG_ERROR_REQUEST_TITLE, DIALOG_LOADING_TEXT, DIALOG_LOADING_TITLE} from "@/Shared/constants";
import DialogErrorClass from "@/classes/Dialog/DialogError";
import DialogInformationClass from "@/classes/Dialog/DialogInformation";
import HelperErrorClass from "@/classes/Helper/HelperError";
import AuthHandlerClass from "@/classes/SignInHandler";
import ErrorSignUpHandlerClass from "@/classes/ErrorSignUpHandler";
import UserSignUp from "@/classes/UserSignUp";
import CsrfAuthClass from "@/classes/CsrfAuth";

export default {
  name: "SignUp",
  data: () => ({
    ...signUpData,

    dialogLoadingInstance: new DialogLoadingClass({
      "title": DIALOG_LOADING_TITLE,
      "text": DIALOG_LOADING_TEXT,
      "isOpen": false
    }),
    dialogErrorInstance: new DialogErrorClass({
      "title": "",
      "text": "",
      "isOpen": false
    }),
    dialogInformationInstance: new DialogInformationClass({
      "title": "",
      "text": "",
      "isOpen": false
    }),
    helperErrorInstance: new HelperErrorClass({}),
    authHandlerInstance: new AuthHandlerClass(),
    errorSignUpHandlerInstance: new ErrorSignUpHandlerClass(),

    user: new UserSignUp({
      "email": "",
      "password": "",
      "name": "",
      "passwordConfirmation": ""
    }),
    csrfAuthClass: new CsrfAuthClass()

  }),
  computed: {
    ...mapGetters("appModule", [
      "isDebugEnabled"
    ]),
    passwordConfirmationRule() {
      return this.password === this.passwordConfirmation || 'Password must match';
    },
  },
  components: {
    ErrorListHelper,
    DialogInformation,
    DialogLoading,
    DialogError
  },
  methods: {
    ...mapMutations("appModule", [
      "setCsrfCookieSettled",
    ]),

    handleConfirmUserCreated() {
      this.$router.push('/signin');
    },

    handleSignInRequestError(error) {

      if (error.response) {

        console.log("error.data", error.data);
        console.log("error.errors", error.errors);

        this.helperErrorInstance.setErrorMap(error.response.data.errors);

        this.dialogErrorInstance.setTitle(error.response.data.message);
        this.dialogErrorInstance.setText("");
        this.dialogErrorInstance.open();

        this.errorSignUpHandlerInstance.handleUserAuthErrorResponse(error);

      } else if (error.request) {

        this.helperErrorInstance.setErrorMap(undefined);

        this.dialogErrorInstance.setTitle(DIALOG_ERROR_REQUEST_TITLE);
        this.dialogErrorInstance.setText(error.message);
        this.dialogErrorInstance.open();

        this.errorSignUpHandlerInstance.handleRequestError(error);

      } else {
        this.errorSignUpHandlerInstance.handleSettingUpError(error);
      }
    },

    signUpFormIsValid() {
      return this.$refs.form.validate();
    },
    async submitSignUpForm() {

      if (!this.signUpFormIsValid()) {
        return;
      }

      try {

        this.dialogLoadingInstance.open();

        if (!this.isCsrfCookieSettled) {
          await this.csrfAuthClass.initializeCsrfCookie();
          this.setCsrfCookieSettled(true);
        }

        const signUpResponse = await this.authHandlerInstance.signUpRequest(this.user);

      } catch (error) {
        this.handleSignInRequestError(error);
      } finally {
        this.dialogLoadingInstance.close();
      }
    },

  }
}
</script>
