<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>      
      <div>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="drawer = !drawer"
          />

          <q-toolbar-title>
            <q-avatar>
              <img src="../../../assets/eZap-Logo.png">
            </q-avatar>            
            e-Zapatillas
          </q-toolbar-title>

        </q-toolbar>
      </div>
      <q-tabs align="left">
        <q-route-tab to="/ProductsPage" label="Hombre" />
        <q-route-tab to="/TestPage" label="Mujer" />
        <q-route-tab to="/TestPage" label="Niños" />
      </q-tabs>      
    </q-header>
    <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

            <q-item active clickable v-ripple to="/ProductsPage">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Inicio
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/ShoppingCart">
              <q-item-section avatar>
                <q-icon name="add_shopping_cart" />
              </q-item-section>

              <q-item-section>
                Carrito de la compra
              </q-item-section>
            </q-item>

              <q-item clickable v-ripple to="/UserProfile">
                <q-item-section avatar>
                  <q-icon name="inbox" />
                </q-item-section>

                <q-item-section>
                  Perfil
                </q-item-section>

              </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Mensajes
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              @click="LogOutUsername()"
            >
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section>
                LogOut
              </q-item-section>
            </q-item>  
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="../../../assets/BG-userSidebar.jpg" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">{{ UserName }}</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script src="./HomeUser.js"></script>
<style src="../../../css/PagesStyles/CardLayout.css"></style>
