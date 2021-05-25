import EZStandardButton from '../../components/Buttons/EZStandardButton.vue'
//Importar Vuelidate
import { required, email, minLength, maxLength, numeric, alpha } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',
  data() {
    return {
      NewName: '',
      NewSurname: '',
      pass: '',
      repeatpass: '',
      email: '',
      PhoneNumber: '',
      Street: ''
    }
  },
  components: {
    EZStandardButton
  },
  computed: {
    ConfirmPWD() {
        return [
            (v) => v == this.pass || "Las claves son diferentes"
         ]
    }
  },
  beforeMount() {
    console.log("Loading");
  },

  validations: {
    NewName: { required, minLength: minLength(2), alpha },
    NewSurname: { required, minLength: minLength(2), alpha },
    email: { required, email },
    pass: { required, minLength: minLength(8), maxLength: maxLength(15) },
    repeatpass: { required, minLength: minLength(8), maxLength: maxLength(15) },
    PhoneNumber: { required, minLength: minLength(7), numeric },
    Street: { required, minLength: minLength(5) }
  },
  methods: {
    //Metodos donde comprobamos que el campo cumple o no las validaciones
    mensaError(campo) {
      if (campo === 'NewName') {
        if (!this.$v.NewName.minLength) return 'Tamaño minimo 4 caracteres'
        if (!this.$v.NewName.required) return 'Campo requerido'
        if (!this.$v.NewName.alpha) return 'Debes introducir letras '
      }
      if (campo === 'NewSurname') {
        if (!this.$v.NewSurname.minLength) return 'Tamaño minimo 4 caracteres'
        if (!this.$v.NewSurname.required) return 'Campo requerido'
        if (!this.$v.NewSurname.alpha) return 'Debes introducir letras '
      }
      if (campo === 'email') {
        if (!this.$v.email.email) return 'Debe ser un email'
        if (!this.$v.email.required) return 'Campo requerido'
      }
      if (campo === 'pass') {
        if (!this.$v.pass.minLength) return 'Tamaño minimo 8 caracteres'
        if (!this.$v.pass.maxLength) return 'Tamaño máximo 15 caracteres'
        if (!this.$v.pass.required) return 'Campo requerido'
      }
      if (campo === 'repeatpass') {
        if (!this.$v.repeatpass.minLength) return 'Tamaño minimo 8 caracteres'
        if (!this.$v.repeatpass.maxLength) return 'Tamaño máximo 15 caracteres'
        if (!this.$v.repeatpass.required) return 'Campo requerido'
      }
      if (campo === 'PhoneNumber') {
        if (!this.$v.PhoneNumber.minLength) return 'Tamaño minimo 7 caracteres'
        if (!this.$v.PhoneNumber.required) return 'Campo requerido'
        if (!this.$v.PhoneNumber.numeric) return 'Debe ser numérico'
      }
      if (campo === 'Street') {
        if (!this.$v.Street.minLength) return 'Tamaño minimo 7 caracteres'
        if (!this.$v.Street.required) return 'Campo requerido'
      }
    },

    toastSignUp() {
      this.$objToaster.ToastifyInfoMsg("Hello SignUp");
    },
    toastCancel() {
      this.$objToaster.ToastifyAlertMsg("Hello Cancel");
    },
    freeToast() {
      this.$objToaster.Toastify("Hello free", "purple");
    },
    goHomePage() {
      this.$router.push({
        path: '/',
        component: () => import('pages/LoginPage/Login.vue')
      })
    },
    signUpUser() {
      var params = {  
        name: this.NewName,
        surname: this.NewSurname,
        password: this.pass,
        email: this.email,
        rol_id: 1,
        enabled: 1,
        address: this.Street
      };
      if (this.repeatpass != this.pass) {
        this.$objToaster.ToastifyDangerMsg('La contraseña introducida no coincide');
      }
      else {
        this.$api.post('/v1/addUser', params)

          .then((response) => {
            if (response.status === 200 && response.data.affectedRows > 0) {
              console.log(response.data);
              this.$objToaster.ToastifyInfoMsg('La cuenta de ' + response.config.data + ' ha sido creada satisfactoriamente.');
              this.$emit('registered', response.config.data)
            }
          })
          .catch((err) => {
            console.log(err);
            this.$objToaster.ToastifyDangerMsg(err.message);
          })
      }
    }
  }
}
