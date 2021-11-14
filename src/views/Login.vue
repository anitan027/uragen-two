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
            <v-alert
              :value="error"
              dense
              type="error"
              transition="scale-transition"
              class="mb-8"
            >
              {{ error }}
            </v-alert>
            <v-form
              ref="form"
              v-model="valid"
              @submit.prevent="handleSubmit"
            >
              <v-text-field
                ref="email"
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
                :disabled="!isErrors ? isLoading : !valid"
                class="mt-7 py-5"
                block
                color="primary"
                elevation="2"
                type="submit"
                :loading="isLoading"
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
import { mapState, mapActions } from "vuex"
import { isErrorEmpty } from '@/helpers/form'

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
    ]
  }),
  mounted() {
    this.$store.commit("login/setErrors", {})
    this.$refs.email.focus()
  },
  computed: {
    ...mapState("login", ["error", "errors", "isLoading"]),
    isErrors() {
      return isErrorEmpty(this.errors)
    }
  },
  methods: {
    ...mapActions("login", ["sendLoginRequest"]),
    async handleSubmit () {
      if (this.$refs.form.validate()) {
        this.$store.commit("login/setError", null)

        this.valid = false

        await this.sendLoginRequest({ email: this.email, password: this.password })

        if (this.isErrors && !this.error) {
          this.$router.push({ name: "Dashboard" })
        } else {
          if (this.errors.email) {
            this.emailRules.push(this.errors.email)
          }

          if (this.errors.password) {
            this.passwordRules.push(this.errors.password)
          }

          this.$refs.form.validate()

          this.emailRules.splice(-1)
          this.passwordRules.splice(-1)

          this.valid = true
        }
      }
    }
  }
}
</script>
