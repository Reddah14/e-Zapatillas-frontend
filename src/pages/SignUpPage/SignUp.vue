<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding>
        <div class="container card-layout fixed-top">
            <q-card class="my-card">
              <q-banner class="bg-primary text-white text-center">
                <p>REGISTRO DE NUEVO USUARIO</p>
              </q-banner>        
              <q-card-actions>
                <div class="col-sm-6 ">
                  <q-input rounded filled v-model="NewName" class="margin-input" label="Nombre" :error-message="mensaError('NewName')"  :error="$v.NewName.$invalid"/>
                </div>
                <div class="col-sm-6">
                  <q-input rounded filled v-model="NewSurname" class="margin-input" label="Apellido" :error-message="mensaError('NewSurname')"  :error="$v.NewSurname.$invalid"/>
                </div>          
                <div class="col-sm-12">
                  <q-input rounded filled v-model="email" label="E-mail y Usuario" :error-message="mensaError('email')" :error="$v.email.$invalid" maxlength="50"/>
                </div>
                <!--A los campos passwords les falta la validacion que el valor del input contenga una letra mayúscula-->
                <div class="col-sm-6">
                  <q-input rounded filled v-model="pass" class="margin-input" type="password" label="Clave" :error-message="mensaError('pass')"  :error="$v.pass.$invalid" />
                </div>
                <div class="col-sm-6">
                  <q-input rounded filled v-bind:rules="ConfirmPWD" v-model="repeatpass" class="margin-input" type="password" label="Repetir Clave" :error-message="mensaError('repeatpass')" :error="$v.repeatpass.$invalid"/>
                </div>
                <div class="col-sm-6">
                  <q-input rounded filled v-model="PhoneNumber" class="margin-input" label="Teléfono" :error-message="mensaError('PhoneNumber')" :error="$v.PhoneNumber.$invalid"/>
                </div>
                <div class="col-sm-6">
                  <q-input rounded filled v-model="Street" class="margin-input" label="Dirección, nº, puerta..." :error-message="mensaError('Street')" :error="$v.Street.$invalid"/>
                </div>
                <div class="col-sm-12 text-center margin-button">
                  <EZ-StandardButton nameOfTheButton="Registro" nameOfTheIcon="outbound" @click="signUpUser" nameOfTheColor="primary"/>
                </div>

              </q-card-actions>
            </q-card>
        </div>
        </q-img>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script src="./SignUp.js"></script>
<style src="../../css/PagesStyles/CardLayout.css"></style>
