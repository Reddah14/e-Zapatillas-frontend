<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding>
        <q-img
          src="../../assets/abstractImage02.jpg"
          :ratio="1"
        >
          <div class="container card-layout fixed-top" >
            <q-card>
              <q-img :ratio="4/3" src="../../assets/LoginImageCard.jpg">
                <div class="absolute-bottom">
                  <div class="text-h6">e-Zapatillas: "tu e-commerce de calzado"</div>
                  <div class="text-subtitle2">by BDN Bros</div>
                </div>
              </q-img>

              <q-card-actions>
                <div class="col-sm-6">
                  <q-input class="margin-input" rounded filled v-model="UserName" label="Usuario" />
                </div>
                <div class="col-sm-6">
                  <q-input class="margin-input" type="password" rounded filled v-model="Password" label="Clave" @keydown.enter.prevent="LoginUser"/>
                </div>

                <div class="col-sm-6 text-center margin-button">
                  <EZ-StandardButton nameOfTheButton="Entrar" nameOfTheIcon="login" @click="LoginUser" nameOfTheColor="primary"/>
                </div>
                <div class="col-sm-6 text-center margin-button">
                  <EZ-StandardButton nameOfTheButton="Registrarse" nameOfTheIcon="add_task" @click="showDialogSignUp" nameOfTheColor="secondary"/>
                </div>
              </q-card-actions>
            </q-card>
          </div>

           <q-dialog v-model="dialog" position="top" full-height full-width persistent @keydown.esc="dialog = false">
             <SignUp @registered="dialog = false"/>
           </q-dialog>
        </q-img>


      </q-page>
    </q-page-container>

  </q-layout>
</template>


<script src="./Login.js"></script>
<style src="../../css/PagesStyles/CardLayout.css"></style>
