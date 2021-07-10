<template>
  <div>
    <b-button id="" @click="modalShow = !modalShow">
      {{buttonName}}
    </b-button>

    <b-modal id="modal-xl" size="xl"  model-class="my-class" v-model="modalShow">
      <div class="modal-css">

        <events-log-preview 
            :eventsLog="body"  >
        </events-log-preview>
        
      </div>
    </b-modal>

  </div>
</template>

<script>

import EventsLogPreview from './matches/match_eventsLogPreview.vue';

export default {
  name:"ModelView",

  components: {
    EventsLogPreview,
  },

  data() {
    return {
      modalShow:false
    };
  },

  props:{
    body:{
        type: Array,
        require: true
    },        
    buttonName:{
        type: String,
        require:true
    },
  }
}
</script>


<style lang="scss" scoped>

/deep/ .modal-css {
  margin:auto!important;
  // padding-top: 200px;
  background: rgb(255, 255, 255);
  min-height: 500px;
}

.modal-css {
    text-align: center;
}


</style>