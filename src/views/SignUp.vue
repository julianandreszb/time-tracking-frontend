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
                      v-model="name"
                      :counter="20"
                      :rules="nameRules"
                      label="Name"
                      required
                  />

                  <v-text-field
                      prepend-icon="mdi-email"
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                  />

                  <v-text-field
                      prepend-icon="mdi-lock"
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
                <v-btn block color="primary" @click="submitSignUpForm">SIGN UP</v-btn>
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
              :title="DialogErrorTitle"
              :text="DialogErrorText"
              :isDisplayed="showDialogError"
              @close="closeDialogError"
          >
            <template v-if="Object.keys(DialogErrorJson).length" >
              <v-list-item  v-for="(errorListValue, formFieldName) in DialogErrorJson"  >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ formFieldName | capitalize }}
                  </v-list-item-title>

                  <v-list-item-subtitle v-for="(errorTextValue) in errorListValue"  >
                    - {{ errorTextValue }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </DialogError>
          <DialogInformation
              :title="DialogInformationTitle"
              :text="DialogInformationText"
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
import DialogLoading from "@/components/DialogLoading";
import DialogError from "@/components/DialogError";
import DialogInformation from "@/components/DialogInformation";

export default {
  name: "SignUp",
  data: () => ({
    showPassword: false,
    showPasswordConfirm: false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required'
    ],
    passwordConfirmation: '',
    passwordConfirmationRules: {
      required: v => !!v || 'Confirm Password is required'
    },

    showDialogLoading: false,
    showDialogError: false,
    showDialogInformation: false,

    DialogErrorTitle: '',
    DialogErrorText: '',
    DialogErrorJson: {},

    DialogInformationTitle: '',
    DialogInformationText: '',
  }),
  components: {
    DialogInformation,
    DialogLoading,
    DialogError
  },
  methods: {
    openDialogLoading() {
      this.showDialogLoading = true;
    },
    closeDialogLoading() {
      this.showDialogLoading = false;
    },
    openDialogError() {
      this.showDialogError = true;
    },
    closeDialogError() {
      this.showDialogError = false;
    },
    openDialogInformation() {
      this.showDialogInformation = true;
    },
    closeDialogInformation() {
      this.showDialogInformation = false;
    },
    handleConfirmUserCreated(){
      this.closeDialogInformation();
      this.$router.push('/signin');
    },
    handleCreateUserError(error) {
      this.isDebugEnabled && console.log('handleCreateUserError.error.response', error.response);
      this.closeDialogLoading();

      if (!!error.response.data.message) {
        this.DialogErrorTitle = error.response.data.message;
      }

      if (!!error.response.data.errors) {
        this.DialogErrorJson = error.response.data.errors;
      }

      this.openDialogError();

      return false;
    },
    handleCreateUserResponse(response) {
      this.isDebugEnabled && console.log('handleCreateUserResponse.response', response);
      this.closeDialogLoading();

      if (!!response.data.status) {
        this.DialogInformationTitle = response.data.status;
      }
      if (!!response.data.message) {
        this.DialogInformationText = response.data.message;
      }

      this.openDialogInformation();
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
