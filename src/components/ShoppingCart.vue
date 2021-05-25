<template>
    <div class="q-pa-xl">
        <div class="row">
          <div class="col-12">
            <template>
              <q-table
                title="Mi Carrito"
                :data="listCarrito"
                :columns="columns"
                row-key="id"
                :pagination.sync="pagination"
                :rows-per-page-options="[0]"
                :hide-pagination="true"
                :hide-bottom="true"
              >
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                      class="text-weight-bold text-primary"
                    >
                    {{ col.label }}
                    
                    </q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">           
                    <q-td key="marca" :props="props">
                      {{ props.row.Marca }}
                    </q-td>
                    <q-td key="name" :props="props">
                        {{ props.row.nombre }}
                    </q-td>
                    <q-td key="color" :props="props">
                        {{ props.row.Color }}
                    </q-td>
                    <q-td>
                      <q-input
                        @input="BehaviourAmountModified()"
                        v-model.number="props.row.cantidad"
                        type="number"
                        filled
                        style="max-width: 200px"
                      />
                    </q-td>
                    
                    <q-td key="precio" :props="props">
                        {{ props.row.precio *  props.row.cantidad }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
              <q-dialog
                persistent
                v-model="showRemoveItemDialog"
              >
                <q-card style="width: 300px">
                  <q-card-section>
                    <div class="text-h6">Aviso</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    Estas apunto de eliminar un elemento del carrito...
                  </q-card-section>

                  <q-card-actions align="right" class="bg-white text-teal">

                    <EZ-StandardButton nameOfTheButton="Sí, quiero borrarlo" style="margin-top:5%;" v-close-popup nameOfTheIcon="done" @click="RemoveItemConfirmation" nameOfTheColor="secondary"/>           
                    <EZ-StandardButton nameOfTheButton="Cancelar" style="margin-top:5%;" v-close-popup nameOfTheIcon="cancel" @click="RemoveItemCancellation" nameOfTheColor="negative"/>           

                  </q-card-actions>
                </q-card>
              </q-dialog>              
            </template>
          </div>
        </div>

        <div class="row items-center no-wrap">
            <div class="col-7"></div>
            <div class="col-5">
                <q-input
                    label="PRECIO TOTAL DEL CARRITO (€)"
                    standout
                    v-model="precioTotalCarrito"
                    readonly
                    style="margin-top: 5%;"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-7">

            </div>
            <div class="col-5">
                <EZ-StandardButton class="buttonsProduct" nameOfTheButton="Volver" style="margin-top:5%;" nameOfTheIcon="keyboard_arrow_left" v-go-back=" '/SingleProduct' " nameOfTheColor="negative" />
                <EZ-StandardButton class="buttonsProduct" nameOfTheButton="PASAR POR CAJA" style="margin-top:5%;" nameOfTheIcon="double_arrow" @click="GoToCheckout()" nameOfTheColor="accent"/>           
            </div>       
        </div>
    </div>
</template>

<script>
import EZStandardButton from './Buttons/EZStandardButton'
export default {
  name: 'ShoppingCart',
  data () {
    return {
      selectedIndexToRemove: -1,
      showRemoveItemDialog: false,
      pagination: {
        rowsPerPage: 0
      },
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
  props: {
  },
  components: {
      EZStandardButton
  },
  beforeMount () {
    this.BehaviourAmountModified();
    this.listCarrito = this.$q.sessionStorage.getItem("ListShoppingCart");
    this.ShowTotalPrice();
  },  
  methods: {
      BehaviourAmountModified() {
        this.RemoveItemWhenZeroAmount();
        this.ShowTotalPrice();
      },
      GoToCheckout(){
        this.$router.push({ path: '/Checkout' });
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
      RemoveItemWhenZeroAmount() {
        for ( var i = 0; i < this.listCarrito.length; i++ ){
          var currentElement = this.listCarrito[i];
          if ( currentElement.cantidad == 0 ) {
            this.selectedIndexToRemove = i;
            this.showRemoveItemDialog = true;
            break;
          }
        }
      },
      RemoveItemConfirmation() {
        this.listCarrito.splice( this.selectedIndexToRemove, 1 ); 

      },
      RemoveItemCancellation() {
        this.showRemoveItemDialog = false;
        this.listCarrito[this.selectedIndexToRemove].cantidad = 1;
        this.ShowTotalPrice();
        this.selectedIndexToRemove = -1;

      }        
  }
}
</script>