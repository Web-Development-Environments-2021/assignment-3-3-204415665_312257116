<template>
  <div  class="space">
    <Accessibility/>
  </div>
</template>


<script>

export default {
    name: "CurrentStageMatches",
    components:{
      Accessibility
    },  
    methods: {
      AddTofavs() 
      {
      this.$emit("AddTofavs")
    }
  }
}
</script>


<style lang="scss" scoped>
  .card{
      min-height: 200px !important;
      min-width: 500px !important;;
  }
</style>