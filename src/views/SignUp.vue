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
                      v-model="name"
                      :counter="20"
                      :rules="nameRules"
                      label="Name"
                      required
                  />
                  <v-text-field
                      prepend-icon="mdi-email"
                      id="v-text-field-email"
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                  />
                  <v-text-field
                      prepend-icon="mdi-lock"
                      id="v-text-field-password"
                      v-model="password"
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
                      v-model="passwordConfirmation"
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
              :isDisplayed="displayDialogLoading"
              text="Creating new user"
          />
          <DialogError
              :title="dialogErrorTitle"
              :text="dialogErrorText"
              :isDisplayed="displayDialogError"

              @close="hideDialogError"
              data-testid="dialog-error"
          >
            <ErrorListHelper :dialogErrorJson="dialogErrorJson"/>
          </DialogError>
          <DialogInformation
              :title="dialogInformationTitle"
              :text="dialogInformationText"
              :isDisplayed="displayDialogInformation"
              @close="handleConfirmUserCreated"
          />
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import {signUpRequest} from "@/requests/signUpRequests";
import {signUpData} from '@/Shared/auth/authData'

import DialogLoading from "@/components/DialogLoading/DialogLoading";
import dialogLoadingData from "@/components/DialogLoading/dialogLoadingData";
import {showDialogLoading, hideDialogLoading} from '@/components/DialogLoading/dialogLoadingMethods'

import DialogError from "@/components/DialogError/DialogError";
import dialogErrorData from "@/components/DialogError/dialogErrorData";
import {hideDialogError, showDialogError} from '@/components/DialogError/dialogErrorMethods'

import DialogInformation from "@/components/DialogInformation/DialogInformation";
import dialogInformationData from "@/components/DialogInformation/dialogInformationData";
import {showDialogInformation} from '@/components/DialogInformation/dialogInformationMethods'

import ErrorListHelper from "@/components/ErrorListHelper/ErrorListHelper";
import errorListHelperData from "@/components/ErrorListHelper/errorListHelperData";

import {
  handleSignUpErrorResponse,
  handleSignUpSuccessResponse
} from '@/Shared/auth/authMethods'

export default {
  name: "SignUp",
  data: () => ({
    ...dialogErrorData,
    ...dialogInformationData,
    ...dialogLoadingData,
    ...errorListHelperData,
    ...signUpData
  }),
  components: {
    ErrorListHelper,
    DialogInformation,
    DialogLoading,
    DialogError
  },
  methods: {
    hideDialogError,
    showDialogError,

    showDialogInformation,

    showDialogLoading,
    hideDialogLoading,

    handleSignUpErrorResponse,
    handleSignUpSuccessResponse,

    handleConfirmUserCreated() {
      this.closeDialogInformation();

      this.$router.push('/signin');
    },
    submitSignUpForm() {
      const signUpFormIsValid = this.$refs.form.validate();
      this.isDebugEnabled && console.log('signUpFormIsValid', signUpFormIsValid);

      if (signUpFormIsValid) {

        this.showDialogLoading();

        signUpRequest({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation
        }).catch(
            this.handleSignUpErrorResponse
        ).then(
            this.handleSignUpSuccessResponse
        );

      }
    },

  },
  computed: {
    ...mapGetters("appModule", [
      "isDebugEnabled"
    ]),
    passwordConfirmationRule() {
      return this.password === this.passwordConfirmation || 'Password must match';
    },
  }
}
</script>
