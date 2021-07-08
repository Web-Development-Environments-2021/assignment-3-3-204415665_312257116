<template>
  <div>
    <b-button @click="modalShow = !modalShow">Open Modal</b-button>

    <b-modal v-model="modalShow">
      <div class="my-class">
      Hello From Modal!
      </div>
      </b-modal>
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

  .my-class {
  margin:auto!important;
  // padding-top: 200px;
  min-width: 10000px;
  min-height: 500px;
  }
</style>

