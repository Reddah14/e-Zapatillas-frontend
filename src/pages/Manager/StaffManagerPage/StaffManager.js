export default {
  name: 'StaffManager',
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
      this.$objToaster.ToastifyInfoMsg("Staff Manager");
    }
  }
}