<template>
  <div v-if="Object.keys(dialogErrorJson).length">
    <v-list-item v-for="(errorListValue, formFieldName) in dialogErrorJson">
      <v-list-item-content>
        <v-list-item-title>
          {{ formFieldName | capitalize }}
        </v-list-item-title>

        <v-list-item-subtitle v-for="(errorTextValue) in errorListValue">
          - {{ errorTextValue }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "ErrorListHelper",
  props: {
    "dialogErrorJson": {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
