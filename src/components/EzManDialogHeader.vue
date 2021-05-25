<template>

        <q-toolbar class="bg-primary text-white" style="border-radius: 5px;">
            <q-avatar>
                <img src="../assets/eZap-Logo.png">
            </q-avatar>
            <q-toolbar-title>
                {{MsgEditOrInsert}}
            </q-toolbar-title>
        </q-toolbar>

</template>

<script>

export default {
  name: 'EZ-ManDialogHeader',
  props: {
      MsgEditOrInsert : String
  },
    methods: {
    }
}
</script>