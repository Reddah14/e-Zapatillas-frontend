import EZStandardButton from '../../../components/Buttons/EZStandardButton.vue'

export default {
    name: 'SingleProduct',
    data () {
      return {
        listTallas: [],
        ShowWarningItem_Dialog: false,
        ConfirmationToAddItem_Dialog: false,
        FinalPrice: 0,
        Zapatilla: {
          id: 0,
          nombre: '',
          descripcion: '',
          Activo: 0,
          Categoria: '',
          idCategoria: 0,
          Marca: '',
          idMarca: 0,
          Color: '',
          idColor: 0,
          Imagen: '',
          precio: 0,
          cantidad: 1,
          talla: '',
          idTalla: 0
        }
      }
    },
    components: {
      EZStandardButton
    },
    beforeMount () {
      this.Zapatilla = this.$q.sessionStorage.getItem("currentZapatilla");
      var shoppingCartElement = this.IsInMyShoppingCart();
      if(shoppingCartElement != false){
        this.Zapatilla.cantidad = shoppingCartElement.cantidad;
        this.Zapatilla.talla = shoppingCartElement.talla;
      }
      this.ShowTotalPrice();
      this.GetTallasApi();
    },
    methods: {
      CloseConfirmationDialog() {
        this.ConfirmationToAddItem_Dialog = false;        
      },
      ConfirmationToAddItem() {
        var listOfCarritoItems = this.$q.sessionStorage.getItem("ListShoppingCart");
        if( listOfCarritoItems == null ){
          listOfCarritoItems = [];
        }
        if( this.IsInMyShoppingCart() == false ){
          listOfCarritoItems.push( this.Zapatilla );
        }
        else {
          for ( var i=0; i<listOfCarritoItems.length; i++ ){
            if (this.Zapatilla.id == listOfCarritoItems[i].id){
              listOfCarritoItems[i].talla = this.Zapatilla.talla.nombre;
              listOfCarritoItems[i].idTalla = this.Zapatilla.talla.id
              listOfCarritoItems[i].cantidad = this.Zapatilla.cantidad;
            }
          }
        }
        this.$q.sessionStorage.set("ListShoppingCart", listOfCarritoItems);

        this.$objToaster.Toastify("Añadido al carrito", "primary" );
        this.ConfirmationToAddItem_Dialog = false;
      },
      GetTallasApi () {
        this.$api.get('/v1/getTallas')
        .then((response) => {

          if (response.status === 200 && response.data.length > 0) {
            var dataAux = response.data;
            this.listTallas = [];

            for (var i=0; i < dataAux.length; i++) {
              var currentElement = dataAux[i]; // seteamos la lista con el valor booleano, tal y como lo necesita el ToggleButton de Quasar
              var currentBooleanValue = currentElement.Activo.data[0] == 1 ? true : false;
              var currentElementBeautified = { // aqui me estoy inventando un objeto que tiene los campos que necesito. (En este caso 4)
                id: currentElement.id,
                nombre: currentElement.nombre,
                descripcion: currentElement.descripcion,
                Activo: currentBooleanValue,
                nombreAmostrar: currentElement.nombre
              }
              this.listTallas.push(currentElementBeautified);
            }  
          }
        })
        .catch((err) => {
          this.$objToaster.ToastifyDangerMsg(err.message);
        })
      },
      ShowTotalPrice() {
        this.WarningItemDialog();
        this.FinalPrice = this.Zapatilla.precio * this.Zapatilla.cantidad;
      },
      BackToProductsPage() {
        this.$router.push({ path: '/ProductsPage' });
      },
      AñadirToCarritoButton() {
        this.ConfirmationToAddItem_Dialog = true;
      },
      WarningItemDialog() {
        if ( this.Zapatilla.cantidad == 0 ) {
            this.ShowWarningItem_Dialog = true;
        }
      },
      CloseWarningItemDialog() {
        this.ShowWarningItem_Dialog = false;
        this.Zapatilla.cantidad = 1;
        this.FinalPrice = this.Zapatilla.precio * this.Zapatilla.cantidad;
      },
      IsInMyShoppingCart() {
        var listOfCarritoItems = this.$q.sessionStorage.getItem("ListShoppingCart");
        if( listOfCarritoItems != null ){
          for ( var i=0; i < listOfCarritoItems.length; i++ ){
            if( listOfCarritoItems[i].id == this.Zapatilla.id ){
              return listOfCarritoItems[i];
            }
          }
        }
        return false;
      }
    }
  }