<template>
  <div>
    <b-button @click="modalShow = !modalShow">Open Modal</b-button>

    <b-modal model-class="my-class" v-model="modalShow">
      <div class="my">
      Hello From Modal!
      </div>
      </b-modal>
  </div>
</template>

<script>
export default {
    name:"ModelView",
    data() {
      return {
        modalShow: false
      };
    },
    props:{
        body:{
            type: Object,
            // require:true
        }
    }
}
</script>

<style lang="scss" scoped>

  /deep/ .my-class {
  margin:auto!important;
  // padding-top: 200px;
  background: rgb(255, 255, 255);
  min-height: 500px;
  }
</style>