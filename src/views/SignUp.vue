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
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import {createUserAsync}  from "@/services/signupServices";

export default {
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
    }
  }),
  methods: {

    handleCreateUserResponse(response) {
      this.isDebugEnabled && console.log('handleCreateUserResponse.response', response);

      this.$router.push('/signin')
    },
    submitSignUpForm() {
      const signupFormIsValid = this.$refs.form.validate()
      this.isDebugEnabled && console.log('signupFormIsValid', signupFormIsValid);

      if (signupFormIsValid) {
        createUserAsync(
            this.name,
            this.email,
            this.password,
            this.passwordConfirmation
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
