import EZStandardButton from '../../../components/Buttons/EZStandardButton.vue'
export default {
  name: 'HomeManager',
  data () {
    return {
      UserName: '',
      Password: '',
      userID_role: 0,
      drawer: false      
    }
  },
  components: {
    EZStandardButton
  },
  beforeMount () {
    this.UserName = this.$q.sessionStorage.getItem( 'userName' );
    this.$objFunctions.restoreUserToken();
  }
  ,

  methods: {
    LogOutUsername(){
      // remove user, rol and token from storage
      this.$objFunctions.RemoveStorageCredentials();
      // remove the token from Quasar default Api
      this.$api.defaults.headers.common['Authorization'] = '';
      // go to login page
      this.$router.push({ path: '/' });
    }
  }
}