<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>SIGN IN</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                  <v-text-field
                      prepend-icon="mdi-email"
                      v-model="user.email"
                      :rules="emailRules"
                      label="E-mail"
                      data-testid="email"
                      required
                  />
                  <v-text-field
                      prepend-icon="mdi-lock"
                      v-model="user.password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="showPassword ? 'text' : 'password'"
                      label="Password"
                      data-testid="password"
                      counter
                      @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn data-testid="sign-in" block color="primary" @click="submitSignInForm">SIGN IN</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-spacer></v-spacer>
                <p class="my-2">No account?</p>
                <v-btn
                    class="ma-1"
                    color="primary"
                    plain
                    to="/signup"
                    data-testid="sign-up"
                >
                  Sign Up here
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

import DialogLoading from "@/components/DialogLoading/DialogLoading";
import DialogError from "@/components/DialogError/DialogError";
import DialogInformation from "@/components/DialogInformation/DialogInformation";
import ErrorListHelper from '@/components/ErrorListHelper/ErrorListHelper';

import DialogLoadingClass from "@/classes/Dialog/DialogLoading"
import DialogErrorClass from "@/classes/Dialog/DialogError"
import DialogInformationClass from "@/classes/Dialog/DialogInformation"
import HelperErrorClass from "@/classes/Helper/HelperError"
import AuthHandlerClass from "@/classes/SignInHandler";
import UserClass from "@/classes/User";
import ErrorSignInHandlerClass from "@/classes/ErrorSignInHandler";
import CsrfAuthClass from "@/classes/CsrfAuth"

import {signInData} from '@/Shared/auth/authData'
import {
  DIALOG_ERROR_REQUEST_TITLE,
  DIALOG_ERROR_RESPONSE_TITLE,
  DIALOG_LOADING_TEXT,
  DIALOG_LOADING_TITLE
} from "@/Shared/constants";


export default {
  name: 'SignIn',
  data: () => ({
    ...signInData,

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
    errorSignInHandlerInstance: new ErrorSignInHandlerClass(),
    user: new UserClass({
      "email": "",
      "password": ""
    }),
    csrfAuthClass: new CsrfAuthClass()

  }),
  computed: {
    ...mapGetters("appModule", [
      "isDebugEnabled",
      "isCsrfCookieSettled",
    ]),
  },
  components: {
    ErrorListHelper,
    DialogInformation,
    DialogLoading,
    DialogError,
  },
  methods: {
    ...mapMutations("appModule", [
      "setCsrfCookieSettled",
    ]),

    handleSignInRequestError(error) {

      if (error.response) {

        this.helperErrorInstance.setErrorMap(error.errors);

        this.dialogErrorInstance.setTitle(DIALOG_ERROR_RESPONSE_TITLE);
        this.dialogErrorInstance.setText(error.response.data.message);
        this.dialogErrorInstance.open();

        this.errorSignInHandlerInstance.handleUserAuthErrorResponse(error);

      } else if (error.request) {

        this.helperErrorInstance.setErrorMap(undefined);

        this.dialogErrorInstance.setTitle(DIALOG_ERROR_REQUEST_TITLE);
        this.dialogErrorInstance.setText(error.message);
        this.dialogErrorInstance.open();

        this.errorSignInHandlerInstance.handleRequestError(error);

      } else {
        this.errorSignInHandlerInstance.handleSettingUpError(error);
      }
    },
    signInFormIsValid() {
      return this.$refs.form.validate();
    },

    async submitSignInForm() {

      if (!this.signInFormIsValid()) {
        return;
      }

      try {

        this.dialogLoadingInstance.open();

        if (!this.isCsrfCookieSettled) {
          await this.csrfAuthClass.initializeCsrfCookie();
          this.setCsrfCookieSettled(true);
        }

        const signInResponse = await this.authHandlerInstance.signInRequest(this.user);

      } catch (error) {
        this.handleSignInRequestError(error);
      } finally {
        this.dialogLoadingInstance.close();
      }

    },
  }
}
</script>
