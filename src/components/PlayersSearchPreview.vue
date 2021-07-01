<template>
  <div style="padding: 20px;">
    <!-- blue - #293241
         orang - #ee6c4d
         e0fbfc
         98c1d9
         3d5a80
     -->
    <!-- <router-link :to="{name:player}">
    </router-link> -->
    <b-card-group deck>
      <b-card
        :title="this.player.name"
        :img-src="this.player.image"
        img-alt="Image"
        img-top
        img-width=10px
        tag="article"
        class="mb-2"

      >
        <b-card-text>

          team name:<b>{{this.player.team_name}}</b>
           <br> 
          position:<b>{{this.player.position}}</b>
        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
    name: "PlayersInformation",

    props: {
        player: {
            type: Object,
            required: true
        }
        
    }
}
</script>

<style scoped>


  .card{
    width: 16rem!important;
    height: 26rem!important;
    font-size: 13px!important;
    background-color: rgb(255, 255, 255)!important;
    padding: 3px;
    box-shadow: 0 9px rgb(110, 110, 110);
    border-radius: 30px;


  }
  .card-img-top {
    width: 100%;
    height: 13vw;
    object-fit: cover;
}
  .card-title{
    font-size: 16px!important;
  }
</style>

