<template>
  <v-container class="mt-3">
    <v-row no-gutters justify="center">
      <v-col sm="9" md="6" lg="5">
        <v-card
          elevation="2"
          class="pa-6"
        >
          <v-card-title class="mb-3">Sign In Form</v-card-title>
          <v-card-subtitle>Start creating the best possible user experience for you customers.</v-card-subtitle>
          <v-card-text class="mt-4">
            <v-form
              ref="form"
              v-model="valid"
              @submit.prevent="handleSubmit"
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                prepend-icon="mdi-email"
                required
                class="mb-4"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="showPassword? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <div class="text-right mt-2">
                <a href="#" class="text-decoration-none subtitle-1">Forgot Password?</a>
              </div>
              <v-btn
                :disabled="!valid"
                class="mt-7"
                block
                color="primary"
                elevation="2"
                type="submit"
                :loading="loading"
              >
              Sign In
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'Please enter your e-mail.',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    showPassword: false,
    passwordRules: [
      v => !!v || 'Please enter your password.'
    ],
    loading: false
  }),
  methods: {
    handleSubmit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.valid = false
        console.log(this.email, this.password)
        setTimeout(() => {
          this.loading = false
          // this.valid = true
          this.emailRules.push('The email and password you entered don\'t match')
          this.passwordRules.push('Wrong password')
          this.$refs.form.validate()
        }, 3000)
      }
    }
  }
}
</script>
