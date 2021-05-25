<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Tallas"
        :data="listTallas"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :hide-pagination="true"
        :hide-bottom="true"
        :filter="tableFilter"
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
        <template v-slot:top-right>
          <EZ-StandardButton nameOfTheButton="Añadir" nameOfTheIcon="add" @click="ShowInsertDialog()" nameOfTheColor="primary" />
          <q-input outlined dense debounce="300" v-model="tableFilter" placeholder="Buscar" style="margin-left:5px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" @click.native="ShowEditDialog( props.row )">           
            <q-td key="nombre" :props="props">
              {{ props.row.nombre }}
            </q-td>
            <q-td key="descripcion" :props="props" :style="{width: '50%', whiteSpace: 'normal'}" >
                {{ props.row.descripcion }}
            </q-td>
            <q-td key="Activo" :props="props">
              <q-toggle
                v-model="props.row.Activo"
                color="green"
                disable
              />
            </q-td>

            <q-dialog v-model="dialog" position="right" full-height persistent @keydown.esc="dialog = false">
              <q-card style="width: 350px" >
                <q-card-section>
                  <EzManDialogHeader :MsgEditOrInsert="MsgEditOrInsert"/>
                  <q-input
                    label="nombre"
                    v-model="rowSelected.nombre"
                  >
                  </q-input>
                  <q-input
                    label="descripcion"
                    v-model="rowSelected.descripcion"
                    @keydown.enter.prevent="InsertOrUpdate"
                  >
                  </q-input>
                  <q-toggle
                    label="Activo"
                    v-model="rowSelected.Activo"
                  >
                  </q-toggle>

                </q-card-section>


                <q-separator dark />

                <q-card-actions align="around">
                  <EZ-StandardButton nameOfTheButton="Guardar" nameOfTheIcon="done" @click="InsertOrUpdate()" nameOfTheColor="primary"/>
                  <EZ-StandardButton nameOfTheButton="Cancelar" nameOfTheIcon="cancel" @click="CancelDialogButton()" nameOfTheColor="secondary"/>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-tr>
        </template>      
      </q-table>    
    </div>
  </q-page>
</template>

<script src="./Tallas.js"></script>