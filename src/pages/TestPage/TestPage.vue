<template>
  <q-page padding>
    <div class="container">
      <h1>Test Page</h1>
      <div class="row" style="max-width: 100%">
        <q-card style="background-color: #ADFF2F">
          <h4>Test Login</h4>
          <q-input rounded filled class="margin-input" label="TestName" v-model="TestName"/>
          <q-input rounded filled class="margin-input" label="TestPwd"  v-model="TestPwd"/>
          <EZ-StandardButton nameOfTheButton="Test Login" nameOfTheIcon="edit" @click="TestLogin" nameOfTheColor="secondary"/>
        <q-card style="background-color: #FFE4E1">
          <h4>Test image picker</h4>
        <q-file filled v-model="selected_file" label="Filled" />
          <EZ-StandardButton nameOfTheButton="Insert Zapatilla" nameOfTheIcon="image" @click="insertArticulo" nameOfTheColor="primary"/>
          <q-img
            :src="urlImageSelected"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
          />
        </q-card>
        </q-card>
        <q-card style="background-color: #00CED1">
          <h4>Test SignUp</h4>
          <q-input rounded filled class="margin-input" label="Name" v-model="regTestName"/>
          <q-input rounded filled class="margin-input" label="Surname" v-model="regTestSurname"/>
          <q-input rounded filled class="margin-input" label="User" v-model="regTestUsername"/>
          <q-input rounded filled class="margin-input" label="Pass"  v-model="regTestPwd"/>
          <EZ-StandardButton nameOfTheButton="Test Create" nameOfTheIcon="add" @click="TestCreate" nameOfTheColor="primary"/>
        </q-card>

      </div>

    </div>
  </q-page>
</template>

<script src="./TestPage.js"></script>
