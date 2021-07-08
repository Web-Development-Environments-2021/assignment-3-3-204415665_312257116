<template>
  <div>
    <b-button @click="modalShow = !modalShow">Open Modal</b-button>

    <b-modal modal-class="my-class" v-model="modalShow">Hello From Modal!</b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modalShow: false
      }
    }
  }
</script>

<style lang="scss" scoped>

  /deep/ .my-class {
  color: rgb(255, 0, 0);
  margin:auto!important;
  }
</style>

