import EZStandardButton from '../../../components/Buttons/EZStandardButton.vue'
import EzManDialogHeader from '../../../components/EzManDialogHeader.vue'
export default {
    name: 'Colores',
    data () {
      return {
        tableFilter: '',
        pagination: {
          rowsPerPage: 0
        },        
        rowSelected: {
            id: 0,
            nombre: '',
            Activo: false,
            hex: '#ffffff'
        },
        MsgEditOrInsert: '',
        ImGoingToInsert: true,
        dialog: false,          
        pagination: {
          rowsPerPage: 0
        },
        ListColores: [],
        columns: [
            { name: 'nombre', label: 'NOMBRE', align: 'left', field: 'nombre', sortable: true },
            { name: 'Activo', label: 'ACTIVO', align: 'left', field: 'Activo', sortable: true },
            { name: 'hex', label: 'HEX', align: 'left', field: 'hex', sortable: true }
          ],              
      }
    },
    components: {
      EZStandardButton,
      EzManDialogHeader      
    },
    beforeMount () {
      this.GetColoresApi();
    },
    methods: {
      ShowEditDialog (pRowSelected) {
        this.ImGoingToInsert = false;
        this.MsgEditOrInsert = 'Editar Color';
        this.dialog = true;
        this.rowSelected = pRowSelected; 
      },
      ShowInsertDialog() {
        this.ImGoingToInsert = true;
        this.MsgEditOrInsert = 'Insertar Color';
        this.rowSelected = {};
        this.dialog = true;  
      },        
      CancelDialogButton(){
          this.dialog = false;
      },
      InsertOrUpdate() {
        if (this.ImGoingToInsert == true) {
          this.insertColor();
          this.dialog = false;
        }
        else {
          this.UpdateColor();          
          this.dialog = false;
        }
      },
      GetColoresApi() {
        this.$api.get('/v1/getColores')
        .then((response) => {
          if (response.status === 200 && response.data.length > 0) {
            this.ListColores = [];

            for (var i=0; i < response.data.length; i++) {
              var currentElement = response.data[i]; // seteamos la lista con el valor booleano, tal y como lo necesita el ToggleButton de Quasar
              var currentBooleanValue = currentElement.Activo.data[0] == 1 ? true : false;
              var currentElementBeautified = {
                id: currentElement.id,
                nombre: currentElement.nombre,
                Activo: currentBooleanValue,
                hex: currentElement.hex
              }
              this.ListColores.push(currentElementBeautified);
            }
          }
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      UpdateColor() {
        var params = {
          id: this.rowSelected.id,
          nombre: this.rowSelected.nombre,
          Activo: this.rowSelected.Activo == true ? 1 : 0,
          hex: this.rowSelected.hex
        }
        this.$api.post('/v1/updateColor', params)
        .then((response) => {
          if (response.status === 200 && response.data.affectedRows > 0) {
            this.dialog = false;
            this.$objToaster.ToastifyInfoMsg('Color "' + this.rowSelected.nombre + "' editado.");
          }
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      insertColor() {
        var params = {
          nombre: this.rowSelected.nombre,
          Activo: this.rowSelected.Activo == true ? 1 : 0,
          hex: this.rowSelected.hex
        }
        this.$api.post('/v1/insertColor', params)
  
        .then((response) => {
          if( response.status === 200 && response.data.affectedRows > 0 ) {
            // now we prepare the new row to avoid asking API again just for this new added row
            var InsertedCol = {
              id: response.data.insertId, // inside the API response we have the ID of the new inserted row
              nombre: this.rowSelected.nombre,
              Activo: this.rowSelected.Activo,
              hex: this.rowSelected.hex
            };
            this.ListColores.push(InsertedCol);
            this.dialog = false;
            this.$objToaster.ToastifyInfoMsg('Color "' + this.rowSelected.nombre + "' insertado.");
          }       

        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      }      
    }
  }