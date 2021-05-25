<template>
    <q-btn class="glossy" :color="nameOfTheColor" size="md" @click="onClick" >
      <q-icon left size="2em" :name="nameOfTheIcon" />
      <div>{{nameOfTheButton}}</div>
    </q-btn>
</template>

<script>

export default {
  name: 'EZ-StandardButton',
  props: {
      nameOfTheButton : String,
      nameOfTheIcon : String,
      nameOfTheColor : String
  },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
}
</script>