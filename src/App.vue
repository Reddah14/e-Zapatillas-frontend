<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
require('src/utils/toastificator');
require('src/utils/functions');


export default defineComponent({
  name: 'App'
})
</script>
