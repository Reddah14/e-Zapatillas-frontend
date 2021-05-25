<template>
    <q-page padding>
      <template>
        <div class="row">
          <div class="col-3">

          </div>
          <div class="col-6">

            <q-img :ratio="4/3" :src="Zapatilla.Imagen" >
              <div class="absolute-bottom" >
                <div class="text-h6">
                    {{ Zapatilla.nombre }}
                </div>
                <div class="text-subtitle2">
                    {{Zapatilla.descripcion}}
                </div>
              </div>
            </q-img>

          </div>          
          <div class="col-3">
            
          </div>
        </div>
        <div class="row" style="display: flex;flex-grow: 4;" >
          <div class="col-3">

          </div>
          <div class="col-2">
            <q-input
              @input="ShowTotalPrice()"
              v-model.number="Zapatilla.cantidad"
              type="number"
              filled
            />
          </div>
          <div class="col-1">
            <q-input readonly v-model="Zapatilla.Color" />
          </div>
          <div class="col-1">
            <q-select
              label="Talla"  
              option-value="id"
              option-label="nombre"
              :options="listTallas"
              v-model="Zapatilla.talla"
            />             
          </div>
          <div class="col-2">
            <q-input
              label="PRECIO TOTAL(€)"
              standout
              v-model="FinalPrice"
              readonly
            />
          </div>          
          <div class="col-3">

          </div>        
        </div>
        <div class="row">
          <div class="col-3">

          </div>
          <div class="col-6 buttonsProduct">
            <EZ-StandardButton class="buttonsProduct" nameOfTheButton="Volver" nameOfTheIcon="keyboard_arrow_left" @click="BackToProductsPage()" nameOfTheColor="negative" />
            <EZ-StandardButton class="buttonsProduct" nameOfTheButton="Añadir al Carrito" nameOfTheIcon="add_shopping_cart" @click="AñadirToCarritoButton()" nameOfTheColor="positive" />
          </div>
          <div class="col-3">
          
          </div>
          
        </div>
        <q-dialog
          persistent
          v-model="ShowWarningItem_Dialog"
        >
          <q-card style="width: 300px">
            <q-card-section>
              <div class="text-h6">Aviso</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              No se pueden poner números negativos...
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">

              <EZ-StandardButton nameOfTheButton="Ok, entendido" style="margin-top:5%;" v-close-popup nameOfTheIcon="done" @click="CloseWarningItemDialog()" nameOfTheColor="secondary"/>           

            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog
          persistent
          v-model="ConfirmationToAddItem_Dialog"
        >
          <q-card style="width: 300px">
            <q-card-section>
              <div class="text-h6">Confirmación</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Está seguro que quiere añadir al Carrito?
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">

              <EZ-StandardButton nameOfTheButton="Sí, quiero" style="margin-top:5%;" v-close-popup nameOfTheIcon="done" @click="ConfirmationToAddItem()" nameOfTheColor="secondary"/>           
              <EZ-StandardButton nameOfTheButton="Cancelar" style="margin-top:5%;" v-close-popup nameOfTheIcon="keyboard_arrow_left" @click="CloseConfirmationDialog()" nameOfTheColor="negative"/>           

            </q-card-actions>
          </q-card>        
        </q-dialog>                 
      </template>
    </q-page>
</template>

<script src="./SingleProduct.js"></script>
<style src="../../../css/PagesStyles/CardLayout.css"></style>


