import EZStandardButton from '../../../components/Buttons/EZStandardButton.vue'
import EzManDialogHeader from '../../../components/EzManDialogHeader.vue'
export default {
    name: 'Marcas',
    data () {
      return {
        tableFilter: '',
        pagination: {
          rowsPerPage: 0
        },        
        rowSelected: {
            id: 0,
            nombre: '',
            Activo: false
        },
        MsgEditOrInsert: '',
        ImGoingToInsert: true,
        dialog: false,          
        pagination: {
          rowsPerPage: 0
        },
        ListMarcas: [],
        columns: [
            { name: 'nombre', label: 'NOMBRE', align: 'left', field: 'nombre', sortable: true },
            { name: 'Activo', label: 'ACTIVO', align: 'left', field: 'Activo', sortable: true }
          ],              
      }
    },
    components: {
      EZStandardButton,
      EzManDialogHeader      
    },
    beforeMount () {
      this.GetMarcasApi();
    },
    methods: {

      ShowEditDialog (pRowSelected) {
        this.ImGoingToInsert = false;
        this.MsgEditOrInsert = 'Editar Marca';
        this.dialog = true;
        this.rowSelected = pRowSelected;
          console.log("La fila seleccionada es: " + pRowSelected);    
      },
      ShowInsertDialog() {
        this.ImGoingToInsert = true;
        this.MsgEditOrInsert = 'Insertar Marca';
        this.rowSelected = {};
        this.dialog = true;  
      },        
      CancelDialogButton(){
          this.dialog = false;
      },
      InsertOrUpdate() {
        if (this.ImGoingToInsert == true) {
          this.InsertCategoria();
          this.dialog = false;
        }
        else {
          this.UpdateMarca();          
          this.dialog = false;
        }
      },
      GetMarcasApi() {

        this.$api.get('/v1/getmarcas')

        .then((response) => {
// con el IF de abajo, se verifica que la respuesta es satisfactoria ( "response.status===200" ) y que además devuelve datos ( "response.data.length > 0" )

          if (response.status === 200 && response.data.length > 0) {
            this.ListMarcas = [];

            for (var i=0; i < response.data.length; i++) {
              var currentElement = response.data[i]; // seteamos la lista con el valor booleano, tal y como lo necesita el ToggleButton de Quasar
              var currentBooleanValue = currentElement.Activo.data[0] == 1 ? true : false;
              var currentElementBeautified = {
                id: currentElement.id,
                nombre: currentElement.nombre,
                Activo: currentBooleanValue
              }
              this.ListMarcas.push(currentElementBeautified);
            }
                      console.log(this.ListMarcas);
          }
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      UpdateMarca() {
        var params = {
          id: this.rowSelected.id,
          nombre: this.rowSelected.nombre,
          Activo: this.rowSelected.Activo
        }

        this.$api.post('/v1/updatemarca', params)

        .then((response) => {
// con el IF de abajo, se verifica que la respuesta es satisfactoria ( "response.status===200" ) y que además devuelve datos ( "response.data.length > 0" )

          if (response.status === 200 && response.data.length > 0) {
            this.dialog = false;
            this.$objToaster.ToastifyInfoMsg('Categoria "' + this.rowSelected.nombre + "' editada.");
          }
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      InsertCategoria() {
        var params = {
          nombre: this.rowSelected.nombre,
          Activo: this.rowSelected.Activo == true ? 1 : 0
        }
        this.$api.post('/v1/insertmarca', params)
  
        .then((response) => {
          if( response.status === 200 && response.data.affectedRows > 0 ) {
            // now we prepare the new row to avoid asking API again just for this new added row
            var InsertedCat = {
              id: response.data.insertId, // inside the API response we have the ID of the new inserted row
              nombre: this.rowSelected.nombre,
              Activo: this.rowSelected.Activo
            };
            this.ListMarcas.push(InsertedCat);
            this.dialog = false;
            this.$objToaster.ToastifyInfoMsg('Categoria "' + this.rowSelected.nombre + "' insertada.");
          }       

        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      }      
    }
  }