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
              :isDisplayed="showDialogLoading"
              text="Creating new user"
          />
          <DialogError
              :title="dialogErrorTitle"
              :text="dialogErrorText"
              :isDisplayed="showDialogError"
              @close="closeDialogError"
              data-testid="dialog-error"
          >
            <ErrorListHelper :dialogErrorJson="dialogErrorJson"/>
          </DialogError>
          <DialogInformation
              :title="dialogInformationTitle"
              :text="dialogInformationText"
              :isDisplayed="showDialogInformation"
              @close="handleConfirmUserCreated"
          >

          </DialogInformation>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import {createUserAsync} from "@/services/signupServices";

import DialogLoading from "@/components/DialogLoading/DialogLoading";
import dialogLoadingData from "@/components/DialogLoading/dialogLoadingData";
import dialogLoadingMethods from '@/components/DialogLoading/dialogLoadingMethods'

import DialogError from "@/components/DialogError/DialogError";
import dialogErrorData from "@/components/DialogError/dialogErrorData";
import dialogErrorMethods from '@/components/DialogError/dialogErrorMethods'

import DialogInformation from "@/components/DialogInformation/DialogInformation";
import dialogInformationData from "@/components/DialogInformation/dialogInformationData";
import dialogInformationMethods from '@/components/DialogInformation/dialogInformationMethods'

import ErrorListHelper from "@/components/ErrorListHelper/ErrorListHelper";
import errorListHelperData from "@/components/ErrorListHelper/errorListHelperData";

import {signUpData} from '@/components/Shared/registrationData'

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
    ...dialogErrorMethods,
    ...dialogInformationMethods,
    ...dialogLoadingMethods,

    handleConfirmUserCreated() {
      this.closeDialogInformation();
      this.$router.push('/signin');
    },
    handleCreateUserError(error) {
      this.isDebugEnabled && console.log('handleCreateUserError.error.response', error.response);
      this.closeDialogLoading();

      if (!!error.response.data.message) {
        this.dialogErrorTitle = error.response.data.message;
      }

      if (!!error.response.data.errors) {
        this.dialogErrorJson = error.response.data.errors;
      }

      this.openDialogError();

      return false;
    },
    handleCreateUserResponse(response) {
      this.isDebugEnabled && console.log('handleCreateUserResponse.response', response);
      this.closeDialogLoading();

      if (!!response) {
        if (!!response.data.status) {
          this.dialogInformationTitle = response.data.status;
        }
        if (!!response.data.message) {
          this.dialogInformationText = response.data.message;
        }

        this.openDialogInformation();
      }
    },
    submitSignUpForm() {
      const signupFormIsValid = this.$refs.form.validate()
      this.isDebugEnabled && console.log('signupFormIsValid', signupFormIsValid);

      if (signupFormIsValid) {
        this.openDialogLoading();
        createUserAsync(
            this.name,
            this.email,
            this.password,
            this.passwordConfirmation
        ).catch(
            this.handleCreateUserError
        ).then(
            this.handleCreateUserResponse
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
