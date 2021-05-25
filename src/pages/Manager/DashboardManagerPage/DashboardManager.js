export default {
  name: 'DashboardManager',
  data () {
    return {
    }
  },
  components: {
  },
  beforeMount () {
    this.toastTest();
  },
  methods: {
    toastTest () {
      this.$objToaster.ToastifyInfoMsg("Dashboard Manager");
    }
  }
}