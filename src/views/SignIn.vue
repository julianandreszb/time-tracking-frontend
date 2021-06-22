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
                <v-btn data-testid="sign-in"  block color="primary" @click="submitSignInForm">SIGN IN</v-btn>
              </v-card-actions>

              <v-card-actions>
                <v-spacer></v-spacer>
                <p class="my-2" >No account?</p>
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

          <DialogError
              :title="dialogErrorTitle"
              :text="dialogErrorText"
              :isDisplayed="showDialogError"
              @close="closeDialogError"
              data-testid="dialog-error"
          >
            <ErrorListHelper :dialogErrorJson="dialogErrorJson"/>
          </DialogError>


        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DialogError from '@/components/DialogError/DialogError'
import ErrorListHelper from '@/components/ErrorListHelper/ErrorListHelper'
import {loginUserAsync} from '@/services/signinServices'
import dialogErrorMethods from '@/components/DialogError/dialogErrorMethods'

export default {
  name: 'SignIn',
  components: {
    DialogError,
    ErrorListHelper
  },
  data: () => ({
    showPassword: false,
    showPasswordConfirm: false,
    valid: true,

    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',

    passwordRules: [
      v => !!v || 'Password is required',
    ],

    showDialogError: false,

    dialogErrorTitle: '',
    dialogErrorText: '',
    dialogErrorJson: {},
  }),
  methods: {
   ...dialogErrorMethods,

    submitSignInForm() {

      const signupFormIsValid = this.$refs.form.validate()
      this.isDebugEnabled && console.log('signupFormIsValid', signupFormIsValid);

      loginUserAsync(this.email, this.password).then(response => {
        this.isDebugEnabled && console.log('loginUserAsync.response', response);
      });


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
    }
  },
}
</script>
