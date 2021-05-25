<template>

  <div class="q-pa-md">
    <div class="row">
        <q-parallax :height="350" :speed="0.5">
            <template v-slot:media>
                <img src="../../../assets/Fondo-Sport-Shoes.jpg">
            </template>
            <h2 class="text-white justify">Tu e-commerce de Zapatillas</h2>
        </q-parallax>
    </div>
   <div class="row justify-between">
       <template v-for="Zap in listZapatillas">
            <EzapatillaComponent 
                :id="Zap.id" :nameOfEZ="Zap.nombre" :descriptioOfEZ="Zap.descripcion" 
                :priceOfEZ="Zap.precio" :urlImage="Zap.Imagen"
                @SelectedIdZapatilla="ZapatillaSelected(Zap.id)"/>
       </template>
   </div>
  </div>
  

</template>

<script src="./ProductsPage.js"></script>
<style src="./ProductsPage.css"></style>

