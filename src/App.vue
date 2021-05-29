<template>
  <router-view />
</template>

<script>
import SignUp from "@/views/SignUp";
import SignIn from "@/views/SignIn";
export default {
  name: 'App',
  components: {SignIn, SignUp},
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam'],
    ],
  }),
}
</script>
