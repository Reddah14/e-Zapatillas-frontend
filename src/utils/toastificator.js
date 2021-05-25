  import Vue from 'vue'

  const objToaster = new Vue({
    data: {
    },
    methods: {
      Toastify (_message, _color) {
        return this.$q.notify({
            message: _message,
            color: _color
          })
      },
      ToastifyInfoMsg(_message){
        return this.$q.notify({
            message: _message,
            color: 'green'
          })
      },
      ToastifyAlertMsg(_message){
        return this.$q.notify({
            message: _message,
            color: 'orange'
          })
      },
      ToastifyDangerMsg(_message){
        return this.$q.notify({
            message: _message,
            color: 'red'
          })
      }
    }
})

Vue.prototype.$objToaster = objToaster