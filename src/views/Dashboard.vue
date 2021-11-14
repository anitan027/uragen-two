<template>
  <v-container class="mt-3">
    <v-row no-gutters justify="center">
      <v-col>
        <h1>Welcome to dashboard {{ userData }}</h1>
        <button @click="checkUserData">test</button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  name: 'Dashboard',
  computed: {
    ...mapState(["userData"])
  },
  methods: {
    ...mapActions("dashboard", ["testRootState"]),
    checkUserData() {
      this.testRootState()
    }
  }
}
</script>
