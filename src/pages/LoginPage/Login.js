import EZStandardButton from '../../components/Buttons/EZStandardButton.vue'
import SignUp from '../SignUpPage/SignUp.vue'
export default {
  name: 'Login',
  data () {
    return {
      UserName: '',
      Password: '',
      dialog: false
    }
  },
  components: {
    EZStandardButton,
    SignUp
  },
  beforeMount () {
    console.log('hi login');
  },
  methods: {
    
    LoginUser() {
      var params = {
        email: this.UserName,
        password: this.Password
      }
      this.$api.post('/v1/users/login', params)

      .then((response) => {
        if( response.status === 200 && response.data.success === true ) {

          this.$api.defaults.headers.common['Authorization'] = response.data.token;
          this.$q.sessionStorage.set( 'userName', response.data.user.email );
          this.$q.sessionStorage.set( 'userToken', response.data.token );
          this.$q.sessionStorage.set( 'userID_role', response.data.user.rol_id );
          this.$objToaster.ToastifyInfoMsg("Logged in succesfully. Welcome to e-Zapatillas " + this.$q.sessionStorage.getItem( 'userName' ));
            
            if( response.data.user.rol_id == 1 ) {
              this.$router.push({ path: '/ProductsPage' });
            }
            else if( response.data.user.rol_id == 2 ) {
              this.$router.push({ path: '/Zapatillas' });
            }
            else{
              this.$objToaster.ToastifyDangerMsg( "RolID is not correct");
            }
        }
      })
      .catch((err) => {
        this.$objToaster.ToastifyDangerMsg(err.message);
      })
    },  
    showDialogSignUp(){
      this.dialog = true;
    }
  }
}