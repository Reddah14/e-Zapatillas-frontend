import EZStandardButton from '../../../components/Buttons/EZStandardButton.vue'

export default {
    name: 'Checkout',
    data () {
      return {
        maximizedToggle: true,
        ThanksDialog: false,
        confirmPayment_Dialog: false,
        cardUser: "",
        cardNumber: null,
        cardDate: null,
        paymentSelected: "op2",
        paymentOptions: [
          {
            label: 'Visa',
            value: 'op1'
          },
          {
            label: 'MasterCard',
            value: 'op2'
          },
          {
            label: 'AmericanExpress',
            value: 'op3'
          }
        ],         
        columns: [
          { name: 'marca', label: 'MARCA', align: 'left', field: 'marca', sortable: true },
          { name: 'name', label: 'NAME', align: 'left', field: 'name', sortable: true },
          { name: 'color', label: 'COLOR', align: 'left', field: 'color', sortable: true },
          { name: 'cantidad', label: 'CANTIDAD', align: 'left', field: 'cantidad', sortable: true },
          { name: 'precio', label: 'PRECIO (€)', align: 'left', field: 'precio', sortable: true }
        ],
        listCarrito: [],
        precioTotalCarrito: 0
      }
    },
    components: {
      EZStandardButton
    },
    beforeMount () {
      this.listCarrito = [];
      this.listCarrito = this.$q.sessionStorage.getItem("ListShoppingCart");
      this.ShowTotalPrice();
    },
    methods: {
      PaymentDone() {
        this.ThanksDialog = true;
      },
      ConfirmPayment() {
        this.confirmPayment_Dialog = true;
      },     
      ShowTotalPrice() {
        var currentTotalPrice = 0;          
        for ( var i = 0; i < this.listCarrito.length; i++ ){
            var currentElement_FinalPrice = 0;
            var currentElement = this.listCarrito[i];
            currentElement_FinalPrice = currentElement.precio * currentElement.cantidad;
            currentTotalPrice = currentTotalPrice + currentElement_FinalPrice;
        }
        this.precioTotalCarrito = currentTotalPrice;
      },      
      BackToProductsPage() {
        this.$router.push({ path: '/ShoppingCart' });
      }
    }
  }