<template>
    <div class="q-pa-sm q-mt-xl " @click="SelectedZapatilla">
        <div class="row" style="width:200px; height:170px;">
            <q-img
            :src="urlImage"
            spinner-color="white"
            style="width: 100%; height:100%" />
        </div>
        <div class="row">
            <div class="col text-center" style="max-height:100px">
                <h5> {{nameOfEZ}} </h5>
            </div>
        </div>
        <div class="row" style="max-width: 200px;">
            {{showCustomDescription(descriptioOfEZ)}}
        </div>
        <div class="row text-weight-bolder">
            <div class="col">
            </div>
            <div class="col text-h4">
                <p style="font-family: monospace" >{{priceOfEZ}}</p>
            </div>
            <div class="col">
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'EzapatillaComponent',
  props: {
      id: Number,
      urlImage : String,
      nameOfEZ : String,
      descriptioOfEZ : String,
      priceOfEZ : Number
  },
    methods: {
        showCustomDescription(descr){
            var aux='';
            if (descr.length > 72){
                for (var i=0;i<descr.length;i++){
                    if(i>72){
                        aux = aux + "...";
                        break;
                    }else{
                        aux = aux + descr[i];
                    }
                }
            }
            return aux;
        },
        testToast(){
            this.$objToaster.ToastifyInfoMsg( this.nameOfEZ);
        },
        SelectedZapatilla(){
            this.$emit("SelectedIdZapatilla", this.id);
        }
    //   onClick() {
    //     this.$emit("click");
    //   }
    }
}
</script>
