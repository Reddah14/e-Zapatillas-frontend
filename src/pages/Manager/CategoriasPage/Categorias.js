import EZStandardButton from '../../../components/Buttons/EZStandardButton.vue'
import EzManDialogHeader from '../../../components/EzManDialogHeader.vue'
export default {
    name: 'Categorias',
    data () {
      return {
        tableFilter: '',
        pagination: {
          rowsPerPage: 0
        },
        ImGoingToInsert: true,
        MsgEditOrInsert: '',
        dialog: false,
        rowSelected: {
          id: 0,
          descripcion: '',
          nombre: '',
          Activo: false
        },
        columns: [
          { name: 'nombre', label: 'NOMBRE', align: 'left', field: 'nombre', sortable: true },
          { name: 'descripcion', label: 'DESCRIPCION', align: 'center', field: 'descripcion', sortable: true },
          { name: 'Activo', label: 'ACTIVO', align: 'left', field: 'Activo', sortable: true }
        ],

        listCategories: []
      }
    },
    components: {
      EZStandardButton,
      EzManDialogHeader
    },
    beforeMount () {
      this.GetCategoriasApi();
    },
    methods: {
      ShowEditDialog (pRowSelected) {
        this.ImGoingToInsert = false;
        this.MsgEditOrInsert = 'Editar Categoria';
        this.dialog = true;
        this.rowSelected = pRowSelected;
          console.log("La fila seleccionada es: " + pRowSelected);

      },
      GetCategoriasApi () {
        this.$api.get('/v1/getcategorias')
        .then((response) => {
// con el IF de abajo, se verifica que la respuesta es satisfactoria ( "response.status===200" ) y que además devuelve datos ( "response.data.length > 0" )
          
          if (response.status === 200 && response.data.length > 0) {
            var dataAux = response.data;
            this.listCategories = [];
  
            for (var i=0; i < dataAux.length; i++) {
              var currentElement = dataAux[i]; // seteamos la lista con el valor booleano, tal y como lo necesita el ToggleButton de Quasar
              var currentBooleanValue = currentElement.Activo.data[0] == 1 ? true : false;
              var currentElementBeautified = {
                id: currentElement.id,
                nombre: currentElement.nombre,
                descripcion: currentElement.descripcion,
                Activo: currentBooleanValue
              }
              this.listCategories.push(currentElementBeautified);
            }  
          }
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      ShowInsertDialog() {
        this.ImGoingToInsert = true;
        this.MsgEditOrInsert = 'Insertar Categoria';
        this.rowSelected = {};
        this.dialog = true;
      },
      InsertCategoria() {
        var params = {
          nombre: this.rowSelected.nombre,
          descripcion: this.rowSelected.descripcion,
          Activo: this.rowSelected.Activo == true ? 1 : 0
        }
        this.$api.post('/v1/insertcategoria', params)
  
        .then((response) => {
          if( response.status === 200 && response.data.affectedRows > 0 ) {
            // now we prepare the new row to avoid ask again to api just for this new added row
            var InsertedCat = {
              id: response.data.insertId, // inside the api response we have the ID of the new inserted row
              nombre: this.rowSelected.nombre,
              descripcion: this.rowSelected.descripcion,
              Activo: this.rowSelected.Activo
            };
            this.listCategories.push(InsertedCat);
            this.dialog = false;
            this.$objToaster.ToastifyInfoMsg('Categoria "' + this.rowSelected.nombre + "' insertada.");
          }       

        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      UpdateCategoria() {
        var params = {
          id: this.rowSelected.id,
          nombre: this.rowSelected.nombre,
          descripcion: this.rowSelected.descripcion,
          Activo: this.rowSelected.Activo
        }
        this.$api.post('/v1/updatecategoria', params)

        .then((response) => { // aqui se pone la accion a ejecutar cuando recibes la respuesta de la API
          if( response.status === 200 && response.data.affectedRows > 0 ) {
            this.dialog = false;
            this.$objToaster.ToastifyInfoMsg('Categoria "' + this.rowSelected.nombre + "' editada.");
          }          
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })        
      },
      InsertOrUpdate() {
        if (this.ImGoingToInsert == true) {
          this.InsertCategoria();
          this.dialog = false;
        }
        else {
          this.UpdateCategoria();
          this.dialog = false;
        }
      },
      CancelDialogButton(){
        this.dialog = false;
      }
    }
  }