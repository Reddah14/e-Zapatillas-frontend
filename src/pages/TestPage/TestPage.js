import EZStandardButton from '../../components/Buttons/EZStandardButton.vue'
import { api } from 'boot/axios'

export default {
  name: 'TestPage',
  data () {
    return {
      // vars test to login
      TestName: '',
      TestPwd: '',
      // vars test to register
      regTestName: '',
      regTestSurname: '',
      regTestPwd: '',
      regTestUsername: '',
      files : null,
      selected_file:'',
      check_if_document_upload:false,
      MAX_FILE_SIZE: 60000,
      errors: [],
      urlImageSelected: ''
    }
  },
  components: {
    EZStandardButton
  },
  beforeMount () {
    this.toastTest();
  },
  methods: {
    toastTest () {
      this.$objToaster.ToastifyInfoMsg("Test Toast");
    },
    TestLogin() {
      var params = {
        email: this.TestName,
        password: this.TestPwd
      }
      this.$api.post('/v1/users/login', params)

      .then((response) => {
        this.$api.defaults.headers.common['Authorization'] = response.data.token
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    TestCreate() {
      var params = {
        name: this.regTestName,
        surname: this.regTestSurname,
        password: this.regTestPwd,
        email: this.regTestUsername,
        rol_id: 1,
        enabled: 1
      }
      this.$api.post('/v1/addUser', params)

      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
    },
          insertArticulo () {
            this.fileToBase64(this.selected_file)
            .then(this.$objFunctions.resolveAfterTime(1500))
            .then(res => {
              this.urlImageSelected = res.toString();
              var params = {
                nombre : "test name",
                descripcion : "test descr",
                idCategoria : 1,
                precio : 12.5 ,
                idMarca : 1,
                idColor : 2,
                imagen : res.toString(),
                Activo : 1
              }
              this.$api.post('/v1/insertArticulo', params)
        
              .then((response) => {
                console.log(response.data);
              })
              .catch((err) => {
                console.log(err);
              })


            });

          },
    // Converts file to base64 string
    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader(),
          readerBase64 = new FileReader(),
          blob = file.slice(0, 4);
        reader.readAsArrayBuffer(blob);
        reader.onloadend = e => {
          let isValidMimeType = this.$objFunctions.checkMimetype(
            this.$objFunctions.getMimeTypeSignature(e.target.result)
          );
//MAX IMAGE SIZE: 56kb
          if (
            this.$objFunctions.bytesToMegabytes(file.size) >
            this.$objFunctions.bytesToMegabytes(this.MAX_FILE_SIZE)
          ) {
            this.$objToaster.ToastifyInfoMsg("Archivo demasiado pesado (MAX 60 KB)");
          }

          if (isValidMimeType === false) {
            this.$objToaster.ToastifyInfoMsg("Tipo de archivo no soportado");
          }

          if (this.errors.length > 0) {
            this.flashErrors(this.errors);
            this.reset();
            return;
          } else {
            readerBase64.readAsDataURL(file);
          }
        };

        readerBase64.onloadend = () => {
          let res = readerBase64.result;
          resolve(res);
        };

        reader.onerror = error => reject(error);
        readerBase64.onerror = error => reject(error);
      });
    }
          
  }
}