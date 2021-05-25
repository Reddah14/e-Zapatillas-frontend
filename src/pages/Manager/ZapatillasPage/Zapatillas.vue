<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Zapatillas"
        :data="listZapatillas"
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
            <q-td key="Imagen" :props="props">
              <q-img
                :src="props.row.Imagen"
                style="width: 90%"
              />
            </q-td>           
            <q-td key="nombre" :props="props">
              {{ props.row.nombre }}
            </q-td>
            <q-td key="descripcion" :props="props" :style="{width: '40%', whiteSpace: 'normal'}" >
                {{ props.row.descripcion }}
            </q-td>
            <q-td key="Marca" :props="props">
              {{ props.row.Marca }}
            </q-td>
            <q-td key="Categoria" :props="props">
              {{ props.row.Categoria }}
            </q-td>
            <q-td key="precio" :props="props">
              {{ props.row.precio }}
            </q-td>
            <q-td key="Color" :props="props">
              {{ props.row.Color }}
            </q-td>
            <q-td key="Activo" :props="props">
              <q-toggle
                v-model="props.row.Activo"
                color="green"
                disable
              />
            </q-td>
            <q-td key="esMujer" :props="props">
                <template>
                  <q-btn v-if="props.row.esMujer" color="primary" icon="pregnant_woman">
                    <q-tooltip>
                      Femeninas
                    </q-tooltip>
                  </q-btn>
                  <q-btn v-if="!props.row.esMujer" color="primary" icon="directions_run">
                    <q-tooltip>
                      Masculinas
                    </q-tooltip>
                  </q-btn>
                </template>
            </q-td>
            <q-dialog v-model="dialog" position="right" full-height persistent @keydown.esc="dialog = false">
              <q-card style="width: 600px" >
                <div class="row">
                  <EzManDialogHeader :MsgEditOrInsert="MsgEditOrInsert"/>
                </div>
                <div class="row">
                  <div class="col">
                    <q-select
                      filled
                      :value="SelectedMarca"
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      :options="listMarcas"
                      option-value="id"
                      option-label="nombre"
                      @filter="filterMarcas"
                      @input-value="setModelMarca"
                      hint="Marca" >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <q-select
                      filled
                      :value="SelectedCat"
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      :options="listCategories"
                      option-value="id"
                      option-label="nombre"
                      @filter="filterCats"
                      @input-value="setModelCat"
                      hint="Categoria" >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <q-select
                      filled
                      :value="SelectedColor"
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      :options="listColores"
                      option-value="id"
                      option-label="nombre"
                      @filter="filterColores"
                      @input-value="setModelCol"
                      hint="Color" >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <q-img
                      :src="urlImageSelected"
                      spinner-color="white"
                      style="height: 140px; max-width: 150px"
                    />
                    <q-file filled v-model="selected_file" label="Imagen (Max. 60 KB)" @input="eventSelectedImage(selected_file)"/>
                  </div>
                  <div class="col">
                    <q-input
                      label="nombre"
                      v-model="rowSelected.nombre">
                    </q-input>
                    <q-input style="margin-top:7%"
                      label="descripcion"
                      v-model="rowSelected.descripcion"
                      @keydown.enter.prevent="InsertOrUpdate"></q-input>
                    <q-input style="margin-top:7%"
                      label="precio"
                      v-model="rowSelected.precio" mask="###.##">
                    </q-input>
                    <q-toggle
                      label="Activo"
                      v-model="rowSelected.Activo" style="margin-top: 5%; margin-left: 30%">
                    </q-toggle>
                    <q-toggle
                      label="Género Femenino"
                      v-model="rowSelected.esMujer" style="margin-top: 5%; margin-left: 30%">
                    </q-toggle>
                  </div>
                </div>
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

<script src="./Zapatillas.js"></script>
