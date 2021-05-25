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
    </q-header>
    
    <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

            <q-item clickable v-ripple to="/DashboardManager">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Zapatillas">
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Zapatillas
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Categorias">
              <q-item-section avatar>
                <q-icon name="format_list_bulleted" />
              </q-item-section>

              <q-item-section>
                Categorias
              </q-item-section>
            </q-item>


            <q-item clickable v-ripple to="/Tallas">
              <q-item-section avatar>
                <q-icon name="format_size" />
              </q-item-section>

              <q-item-section>
                Tallas
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Colores">
              <q-item-section avatar>
                <q-icon name="format_color_fill" />
              </q-item-section>

              <q-item-section>
                Colores
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Marcas">
              <q-item-section avatar>
                <q-icon name="loyalty" />
              </q-item-section>

              <q-item-section>
                Marcas
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/StaffManager">
              <q-item-section avatar>
                <q-icon name="supervisor_account" />
              </q-item-section>

              <q-item-section>
                Perfil
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

        <q-img class="absolute-top" src="../../../assets/BG-managerSidebar.jpg" style="height: 150px">
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

<script src="./HomeManager.js"></script>
<style src="../../../css/PagesStyles/CardLayout.css"></style>
