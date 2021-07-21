<template>
  <v-dialog
      v-model="isOpen"
      persistent
      width="300"
  >
    <v-card
        color="primary"
        dark
    >
      <v-card-title>{{ title }}</v-card-title>
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
    "isOpen": {
      required: true,
      type: Boolean
    },
    "title": {
      required: true,
      type: String
    },
    "text": {
      required: false,
      type: String
    }
  }
}
</script>

<style scoped>

</style>
