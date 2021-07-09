<template>

  <v-dialog
      :value="isOpen"
      @input="closeDialogInformation"
      width="500"
  >
    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <slot>{{ text }}</slot>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="closeDialogInformation"
        >
          {{ buttonTextFinish }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import {BUTTON_TEXT_CLOSE} from "@/Shared/constants";

export default {
  name: "DialogInformation",
  data() {
    return {}
  },

  props: {
    "isOpen": {
      required: true,
      type: Boolean
    },
    "text": {
      required: false,
      type: String
    },
    "title": {
      required: true,
      type: String
    },
    "buttonTextFinish": {
      required: false,
      type: String,
      default: BUTTON_TEXT_CLOSE
    }
  },
  methods: {
    closeDialogInformation() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>
