import EZStandardButton from '../../../components/Buttons/EZStandardButton.vue'
import EzManDialogHeader from '../../../components/EzManDialogHeader.vue'
export default {
    name: 'Zapatillas',
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
          { name: 'Imagen', label: 'IMAGEN', align: 'left', field: 'Imagen', sortable: true },
          { name: 'nombre', label: 'NOMBRE', align: 'left', field: 'nombre', sortable: true },
          { name: 'descripcion', label: 'DESCRIPCION', align: 'center', field: 'descripcion', sortable: true },
          { name: 'Marca', label: 'MARCA', align: 'left', field: 'Marca', sortable: true },
          { name: 'Categoria', label: 'CATEGORIA', align: 'left', field: 'Categoria', sortable: true },
          { name: 'precio', label: 'PRECIO', align: 'left', field: 'precio', sortable: true },
          { name: 'Color', label: 'COLOR', align: 'left', field: 'Color', sortable: true },
          { name: 'Activo', label: 'ACTIVO', align: 'left', field: 'Activo', sortable: true },
          { name: 'esMujer', label: 'SEXO', align: 'center', field: 'esMujer', sortable: true }
        ],
        listZapatillas: [],
        selected_file: null,
        MAX_FILE_SIZE: 60000,
        urlImageSelected: 'https://newcastlebeach.org/images/cant-find-3.jpg',
        listCategories: [],
        listCategoriesBase: [],
        SelectedCat: { id: 0, nombre: ''},
        listMarcas: [],
        listMarcasBase: [],
        SelectedMarca: { id: 0, nombre: ''},
        listColores: [],
        listColoresBase: [],
        SelectedColor: { id: 0, nombre: ''}
      }
    },
    components: {
      EZStandardButton,
      EzManDialogHeader
    },
    beforeMount () {
      this.GetZapatillasApi();
      this.GetCategoriasApi();
      this.GetColoresApi();
      this.GetMarcasApi();
    },
    methods: {
      ShowEditDialog (pRowSelected) {
        this.ImGoingToInsert = false;
        this.MsgEditOrInsert = 'Editar Zapatilla';
        this.dialog = true;
        this.rowSelected = pRowSelected;
        // if im going to update then i need to set the Category of the selected item
        this.SelectedCat.id = this.rowSelected.idCategoria;
        this.SelectedCat.nombre = this.rowSelected.Categoria;
        this.SelectedMarca.id = this.rowSelected.idMarca;
        this.SelectedMarca.nombre = this.rowSelected.Marca;
        this.SelectedColor.id = this.rowSelected.idColor;
        this.SelectedColor.nombre = this.rowSelected.Color;
        this.urlImageSelected = pRowSelected.Imagen;
      },
      GetZapatillasApi () {
        this.$api.get('/v1/getArticulos')
        .then((response) => {      
          if (response.status === 200 && response.data.length > 0) {
            var dataAux = response.data;
            this.listZapatillas = [];
            for (var i=0; i < dataAux.length; i++) {
              var currentElement = dataAux[i]; // seteamos la lista con el valor booleano, tal y como lo necesita el ToggleButton de Quasar
              var currentBooleanValue = currentElement.Activo.data[0] == 1 ? true : false;
              var currentBooleanValueWoman = currentElement.esMujer.data[0] == 1 ? true : false;
              var currentElementBeautified = {
                id: currentElement.id,
                nombre: currentElement.nombre,
                descripcion: currentElement.descripcion,
                Activo: currentBooleanValue,
                Categoria: currentElement.Categoria,
                idCategoria: currentElement.idCategoria,
                Marca: currentElement.Marca,
                idMarca: currentElement.idMarca,
                Color: currentElement.Color,
                idColor: currentElement.idColor,
                Imagen : this.$objFunctions.bin2String(currentElement.Imagen?.data),
                precio : currentElement.precio + "€",
                esMujer: currentBooleanValueWoman
              }
              this.listZapatillas.push(currentElementBeautified);
            }  
          }
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      ShowInsertDialog() {
        this.ImGoingToInsert = true;
        this.MsgEditOrInsert = 'Insertar Zapatilla';
        this.rowSelected = {
          id: 0,
          Activo: false,
          nombre: '',
          descripcion: '',
          precio: '',
          Categoria: '',
          idCategoria: 0,
          Marca: '',
          idMarca: 0,
          Color: '',
          idColor: 0,
          Imagen: ''
        };
        this.urlImageSelected = '';
        this.SelectedColor = {id: 0, nombre: ''};
        this.SelectedCat = {id: 0, nombre: ''};
        this.SelectedMarca = {id: 0, nombre: ''};
        this.selected_file = null;
        this.dialog = true;
      },
      InsertZapatilla() {
        var params = {
          nombre: this.rowSelected.nombre,
          descripcion: this.rowSelected.descripcion,
          Activo: this.rowSelected.Activo == true ? 1 : 0,
          esMujer: this.rowSelected.esMujer == true ? 1 : 0,
          idCategoria : this.getIdByName(this.SelectedCat.nombre, 'categorias'),
          precio : this.rowSelected.precio.replace("€",""),
          idMarca : this.getIdByName(this.SelectedMarca.nombre, 'marcas'),
          idColor : this.getIdByName(this.SelectedColor.nombre, 'colores'),
          imagen : this.urlImageSelected
        }
        this.$api.post('/v1/insertArticulo', params)
  
        .then((response) => {
          if( response.status === 200 && response.data.affectedRows > 0 ) {
            // now we prepare the new row to avoid ask again to api just for this new added row
            var InsertedZap = {
              id: response.data.insertId, // inside the api response we have the ID of the new inserted row
              nombre: this.rowSelected.nombre,
              descripcion: this.rowSelected.descripcion,
              Activo: this.rowSelected.Activo,
              Categoria: this.SelectedColor.nombre,
              idCategoria: params.idCategoria,
              Marca: this.SelectedMarca.nombre,
              idMarca: params.idMarca,
              Color: this.SelectedColor.nombre,
              idColor: params.idColor,
              Imagen: this.urlImageSelected,
              precio : this.rowSelected.precio.replace("€","")
            };
            this.listZapatillas.push(InsertedZap);
            this.dialog = false;
            this.$objToaster.ToastifyInfoMsg('Zapatilla "' + this.rowSelected.nombre + "' insertada.");
          }       

        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      UpdateZapatilla() {
        var params = {
          id: this.rowSelected.id,
          nombre: this.rowSelected.nombre,
          descripcion: this.rowSelected.descripcion,
          Activo: this.rowSelected.Activo == true ? 1 : 0,
          esMujer: this.rowSelected.esMujer == true ? 1 : 0,
          idCategoria : this.getIdByName(this.SelectedCat.nombre, 'categorias'),
          precio : this.rowSelected.precio.replace("€",""),
          idMarca : this.getIdByName(this.SelectedMarca.nombre, 'marcas'),
          idColor : this.getIdByName(this.SelectedColor.nombre, 'colores'),
          imagen : this.urlImageSelected
        }
        this.$api.post('/v1/updateArticulo', params)

        .then((response) => { // aqui se pone la accion a ejecutar cuando recibes la respuesta de la API
          if( response.status === 200 && response.data.affectedRows > 0 ) {
            this.dialog = false;
            this.$objToaster.ToastifyInfoMsg('Zapatilla "' + this.rowSelected.nombre + "' editada.");
            for (var i=0;i<this.listZapatillas.length;i++){
              if (this.listZapatillas[i].id == this.rowSelected.id){
                this.listZapatillas[i].Imagen = this.urlImageSelected;
              }
            }
          }          
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })        
      },
      InsertOrUpdate() {
        if (this.ImGoingToInsert == true) {
          this.InsertZapatilla();
          this.dialog = false;
        }
        else {
          this.UpdateZapatilla();
          this.dialog = false;
        }
      },
      CancelDialogButton(){
        this.dialog = false;
      },
      eventSelectedImage(selectedImage){
        if (selectedImage != undefined){
          this.$objFunctions.fileToBase64(selectedImage)
          .then(this.$objFunctions.resolveAfterTime(1500))
          .then(res => {
            this.urlImageSelected = res.toString();
          });
        }
      },
      GetCategoriasApi () {
        this.$api.get('/v1/getcategorias')
        .then((response) => {
          if (response.status === 200 && response.data.length > 0) {
            var dataAux = response.data;
            this.listCategories = [];
            this.listCategoriesBase = [];
            for (var i=0; i < dataAux.length; i++) {
              var currentElement = dataAux[i]; 
              var currentElementBeautified = {
                id: currentElement.id,
                nombre: currentElement.nombre
              }
              this.listCategories.push(currentElementBeautified);
              this.listCategoriesBase.push(currentElementBeautified);
            }
          }
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      filterCats (val, update) {
        if (val === '') {
          update(() => {
            this.listCategories = this.listCategoriesBase;
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase();
          this.listCategories = this.listCategoriesBase.filter(v => v.nombre.toLowerCase().indexOf(needle) > -1);
        })
      },
      setModelCat (val) {
        this.SelectedCat.nombre = val;
        this.SelectedCat.id = this.getIdByName(val, "categorias");
      },
      GetColoresApi () {
        this.$api.get('/v1/getcolores')
        .then((response) => {
          if (response.status === 200 && response.data.length > 0) {
            var dataAux = response.data;
            this.listMarcas = [];
            this.listMarcasBase = [];
            for (var i=0; i < dataAux.length; i++) {
              var currentElement = dataAux[i]; 
              var currentElementBeautified = {
                id: currentElement.id,
                nombre: currentElement.nombre
              };
              this.listColores.push(currentElementBeautified);
              this.listColoresBase.push(currentElementBeautified);
            }
          }
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      filterColores (val, update) {
        if (val === '') {
          update(() => {
            this.listColores = this.listColoresBase;
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase();
          this.listColores = this.listColoresBase.filter(v => v.nombre.toLowerCase().indexOf(needle) > -1);
        })
      },
      setModelCol (val) {
        this.SelectedColor.nombre = val;
        this.SelectedColor.id = this.getIdByName(val, "colores");
      },
      GetMarcasApi () {
        this.$api.get('/v1/getMarcas')
        .then((response) => {
          if (response.status === 200 && response.data.length > 0) {
            var dataAux = response.data;
            this.listMarcas = [];
            this.listMarcasBase = [];
            for (var i=0; i < dataAux.length; i++) {
              var currentElement = dataAux[i]; 
              var currentElementBeautified = {
                id: currentElement.id,
                nombre: currentElement.nombre
              }
              this.listMarcas.push(currentElementBeautified);
              this.listMarcasBase.push(currentElementBeautified);
            }
          }
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      filterMarcas (val, update) {
        if (val === '') {
          update(() => {
            this.listMarcas = this.listMarcasBase;
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase();
          this.listMarcas = this.listMarcasBase.filter(v => v.nombre.toLowerCase().indexOf(needle) > -1);
        })
      },
      setModelMarca (val) {
        this.SelectedMarca.nombre = val;
        this.SelectedMarca.id = this.getIdByName(val, "marcas");
      },
      getIdByName(name, table){ // esta funcion es para buscar el ID por nombre
        var _id = 0;
        switch(table){
          case 'marcas':
            _id = this.listMarcasBase.find(x => x.nombre === name).id;
            break;
          case 'categorias':
            _id = this.listCategoriesBase.find(x => x.nombre === name).id;
            break;
          case 'colores':
            _id = this.listColoresBase.find(x => x.nombre === name).id;
            break;
        }
        return _id;
      },
      
    }
  }