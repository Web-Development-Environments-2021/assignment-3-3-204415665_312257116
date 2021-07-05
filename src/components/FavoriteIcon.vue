<template>
  <vue-star animate="animated rubberBand" color="#F05654">
    <a slot="icon" class="fa fa-heart" @click="handleClick"></a>
  </vue-star>
</template>

<script>
export default {
  methods: {
    handleClick () {
      //do something
    }
  }
}
</script>