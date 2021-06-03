<template>
  <v-dialog
      v-model="isDisplayed"
      persistent
      width="300"
  >
    <v-card
        color="primary"
        dark
    >
      <v-card-text>
        {{ text }}
        <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogLoading",
  props: {
    "isDisplayed": {
      required: true,
      type: Boolean
    },
    "text": {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>

</style>
