import EzapatillaComponent from '../../../components/EzapatillaComponent.vue'
export default {
  name: 'ProductsPage',
  data () {
    return {
      listZapatillas: [],

    }
  },
  components: {
    EzapatillaComponent
  },
  beforeMount () {
    this.GetZapatillasApi();
  },
  methods: {
    toastTest () {
      this.$objToaster.ToastifyInfoMsg("Products Toast");
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
              precio : currentElement.precio,
              cantidad: 1,
              talla: "M",
              idTalla: 2
            }
            this.listZapatillas.push(currentElementBeautified);
          }  
        }
      })
      .catch((err) => {
        this.$objToaster.ToastifyDangerMsg(err.message);
      })
    },
    ZapatillaSelected(idZapSelected){
      for(var i=0;i<this.listZapatillas.length;i++){
        if (this.listZapatillas[i].id == idZapSelected){
          this.$q.sessionStorage.set("currentZapatilla", this.listZapatillas[i]);
          this.$router.push({ path: '/SingleProduct' })
        }
      }
    }
  }
}