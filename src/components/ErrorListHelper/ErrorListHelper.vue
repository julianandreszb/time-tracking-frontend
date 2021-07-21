<template>
  <div v-if="Object.keys(errorMap).length">
    <v-list-item v-for="(errorListValue, formFieldName) in errorMap">
      <v-list-item-content>
        <v-list-item-title class="text-sm-h6">
          {{ formFieldName | capitalize }}
        </v-list-item-title>

        <v-list-item-subtitle v-for="(errorTextValue) in errorListValue" class="text-sm-h6">
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
    "errorMap": {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
