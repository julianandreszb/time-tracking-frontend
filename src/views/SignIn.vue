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
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      data-testid="email"
                      required
                  />
                  <v-text-field
                      prepend-icon="mdi-lock"
                      v-model="password"
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
              :isOpen="dialogLoadingIsOpen"
              text="Logging in"
          />
          <DialogError
              :title="dialogErrorTitle"
              :text="dialogErrorText"
              :isOpen="dialogErrorIsOpen"
              @close="closeDialogError"
              data-testid="dialog-error"
          >
            <ErrorListHelper :dialogErrorJson="dialogErrorJson"/>
          </DialogError>
          <DialogInformation
              :title="dialogInformationTitle"
              :text="dialogInformationText"
              :isOpen="dialogInformationIsOpen"
              @close="handleConfirmSignInInformation"
          />
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {logMessage} from "@/Shared/log/debugFunctions";

import {mapGetters} from 'vuex'
import {handleSignInRequest, signInRequest} from '@/requests/signInRequests'

import DialogLoading from "@/components/DialogLoading/DialogLoading";
import dialogLoadingData from "@/components/DialogLoading/dialogLoadingData";
import {
  closeDialogLoading,
  openDialogLoading
} from "@/components/DialogLoading/dialogLoadingMethods";

import DialogError from "@/components/DialogError/DialogError";
import dialogErrorData from "@/components/DialogError/dialogErrorData";
import {
  openDialogError,
  closeDialogError,
  initializeDialogErrorData
} from '@/components/DialogError/dialogErrorMethods';

import DialogInformation from "@/components/DialogInformation/DialogInformation";
import dialogInformationData from "@/components/DialogInformation/dialogInformationData";
import {
  closeDialogInformation,
  openDialogInformation,
  initializeDialogInformationData
} from "@/components/DialogInformation/dialogInformationMethods";

import ErrorListHelper from '@/components/ErrorListHelper/ErrorListHelper';
import errorListHelperData from "@/components/ErrorListHelper/errorListHelperData";

import {signInData} from '@/Shared/auth/authData'
import {handleUserAuthErrorResponse} from '@/Shared/auth/authMethods'

export default {
  name: 'SignIn',
  data: () => ({
    ...dialogErrorData,
    ...dialogInformationData,
    ...dialogLoadingData,
    ...errorListHelperData,
    ...signInData,
  }),
  components: {
    ErrorListHelper,
    DialogInformation,
    DialogLoading,
    DialogError,
  },
  methods: {
    logMessage,

    closeDialogError,
    openDialogError,
    initializeDialogErrorData,

    closeDialogInformation,
    openDialogInformation,
    initializeDialogInformationData,

    closeDialogLoading,
    openDialogLoading,


    handleUserAuthErrorResponse,
    handleSignInRequest,
    handleConfirmSignInInformation() {
      this.closeDialogInformation();
    },

    signInFormIsValid() {
      return this.$refs.form.validate();
    },
    signInRequest,
    submitSignInForm() {

      if (this.signInFormIsValid()) {

        this.handleSignInRequest({
          email: this.email,
          password: this.password
        });

      }


      // apiClient.get('/sanctum/csrf-cookie')
      //     .then(response => {
      //
      //       console.log('/sanctum/csrf-cookie.response', response);
      //
      //       // apiClient.post('/registerNewUser', {
      //       //   name: this.name,
      //       //   email: this.email,
      //       //   password: this.password,
      //       //   password_confirmation: this.passwordConfirmation,
      //       // }).then(response => {
      //       //   console.log('/registerNewUser.response', response);
      //       // });
      //
      //       // apiClient.post('/login', {
      //       //   // name: this.name,
      //       //   email: this.email,
      //       //   password: this.password,
      //       //   // password_confirmation: this.passwordConfirmation,
      //       // }).then(response => {
      //       //   console.log('/login.response', response);
      //       // });
      //
      //       // apiClient.post('/api/test-csrf-cookie').then(response => {
      //       //   console.log('/test-csrf-cookie.response', response);
      //       // });
      //
      //       apiClient.post('/login', {
      //         'email': this.email,
      //         'password': this.password
      //       }).then(response => {
      //         console.log('/login.response', response);
      //
      //         apiClient.post('/api/test-csrf-cookie').then(response => {
      //           console.log('/test-csrf-cookie.response', response);
      //         });
      //       });
      //
      //     });
    },
  },
  computed: {
    ...mapGetters("appModule", [
      "isDebugEnabled"
    ])
  }
}
</script>
