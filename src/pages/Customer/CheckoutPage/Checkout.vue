<template>
    <div class="q-pa-xl">
        <div class="row">
          <div class="col-12">
            <template>
              <q-table
                title="El Resumen de Mi Pedido es:"
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
                        readonly
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
            
            </template>
          </div>
        </div>

        <div class="row items-center no-wrap">
            <div class="col-7"></div>
            <div class="col-5">
                <q-input
                    label="PRECIO TOTAL DEL PEDIDO(€):"
                    standout
                    v-model="precioTotalCarrito"
                    readonly
                    style="margin-top: 5%;"
                />
            </div>
        </div>
      <div class="row">
        <div class="col">
          <EZ-StandardButton class="buttonsProduct" nameOfTheButton="Volver" nameOfTheIcon="keyboard_arrow_left" @click="BackToProductsPage()" nameOfTheColor="negative" />
          <EZ-StandardButton class="buttonsProduct" nameOfTheButton="Pagar" nameOfTheIcon="euro_symbol" @click="ConfirmPayment()" nameOfTheColor="positive" />        
        </div>
        <q-dialog v-model="confirmPayment_Dialog" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Confirma tu Método de Pago:</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-option-group 
                v-model="paymentSelected"
                :options="paymentOptions"
                color="primary"
              />              
              <q-input
                class="buttonsProduct"
                filled
                v-model="cardNumber"
                label="NUMERO DE TARJETA / CVV"
                mask="#### #### #### #### / ###"
                fill-mask="#"
              />
              <q-input
                class="buttonsProduct"
                filled
                v-model="cardUser"
                label="TITULAR DE LA TARJETA"
              />
              <q-input
                class="buttonsProduct"
                v-model="cardDate"
                filled 
                type="date" 
                hint="Caducidad de la tarjeta" />

            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <EZ-StandardButton class="buttonsProduct" nameOfTheButton="Volver" nameOfTheIcon="keyboard_arrow_left" v-close-popup nameOfTheColor="negative" />
              <EZ-StandardButton class="buttonsProduct" nameOfTheButton="Finalizar Pago" nameOfTheIcon="done_outline" @click="PaymentDone()" nameOfTheColor="positive" />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="ThanksDialog">
          <q-card class="bg-primary text-white">
            <q-card-section>
              <div class="text-h6">DISFRUTA TUS ZAPATILLAS!</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Muchas gracias por confiar en nosotros :)
            </q-card-section>

            <q-card-actions align="right">
              <EZ-StandardButton v-go-back=" '/ProductsPage' " class="buttonsProduct" nameOfTheButton="Seguir Comprando" nameOfTheIcon="outbound" nameOfTheColor="positive" />
            </q-card-actions>
          </q-card>
        </q-dialog>
            

      </div>
    </div>
</template>

<script src="./Checkout.js"></script>
<style src="../../../css/PagesStyles/CardLayout.css"></style>


