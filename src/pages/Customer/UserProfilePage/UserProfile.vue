<template>
  <q-layout view="lHh Lpr fFf">
    <div class="row justify-center" style="padding: 4%; padding-bottom: 10%; height: 50%;" >
      <div class="col-6" style="padding-right: 5%;" >
            <q-card class="bg-white text-dark">
            <q-card-section>
                <div class="text-h4 text-center" style="padding: 2%;">User Details</div>
                <q-input standout="text-white" v-model="text" label="Name" />
                <q-input standout="text-white" v-model="text" label="Surname" />
                <q-input standout="text-white" v-model="text" label="UserName" />
                <q-input type="password" standout="text-white" v-model="text" label="Password" />
            <q-separator dark />

            <q-card-actions>
              <q-btn color="positive" style="margin-top: 5%; margin-right: 3%;" icon="check_circle" text-color="white" label="Save" />
              <q-btn color="negative" style="margin-left:0%; margin-top: 5%;" icon="cached" label="Restore Changes" />

            </q-card-actions>
            </q-card-section>

            </q-card>
      </div>
      <div class="col-6" style="padding-right: 5%;">
        <div class="text-h4 text-center" style="padding: 2%;">User Last Orders</div>
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 100%; max-width: 100%;"
        >
          <div v-for="order in 100" :key="n" class="q-pa-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </q-scroll-area>
      </div>      
    </div>
    <div class="row justify-center" style="padding-right: 4%; padding-bottom: 4%; padding-left: 4%;padding-top: 0%; height: 50%;" >
      <div class="col-6" style="max-height: 40%;">
            <q-card class="bg-white text-white">
            <q-card-section>
                <div class="text-h6">User Details</div>
                <q-input standout="text-white" v-model="text" label="Name" />
                <q-input standout="text-white" v-model="text" label="Surname" />
                <q-input standout="text-white" v-model="text" label="UserName" />
                <q-input type="password" standout="text-white" v-model="text" label="Password" />
            <q-separator dark />

            <q-card-actions>
              <q-btn color="white" style="margin-top: 5%;" text-color="black" label="Save Changes" />
            </q-card-actions>
            </q-card-section>

            </q-card>
      </div>
      <div class="col-6" style="max-height: 50%;">
            <q-card class="bg-white text-white">
            <q-card-section>
                <div class="text-h6">User Details</div>
                <q-input standout="text-white" v-model="text" label="Name" />
                <q-input standout="text-white" v-model="text" label="Surname" />
                <q-input standout="text-white" v-model="text" label="UserName" />
                <q-input type="password" standout="text-white" v-model="text" label="Password" />
            <q-separator dark />

            <q-card-actions>
              <q-btn color="white" style="margin-top: 5%;" text-color="black" label="Save Changes" />
            </q-card-actions>
            </q-card-section>

            </q-card>
      </div>      
    </div>    
  </q-layout>
</template>

<script src="./UserProfile.js"></script>
