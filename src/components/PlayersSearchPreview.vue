<template>
  <div style="padding: 5px;">
    <!-- blue - #293241
         orang - #ee6c4d
         e0fbfc
         98c1d9
         3d5a80
     -->
    <!-- <router-link :to="{name:player}">
    </router-link> -->
    <b-card-group id="div-card" deck>
      <b-card 
        style=""
        :title="this.player.name"
        :img-src="this.player.image"
        img-alt="Image"
        img-top
        tag="article"
        class="mb-2 my-card"
      >
      <b-card-text>
          team name:<b>{{this.player.team_name}}</b>
           <br> 
          position:<b>{{this.player.position}}</b>
        </b-card-text>
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
    width: 11rem!important;
    height: 13rem!important;
    font-size: 10.5px!important;
    background-color: rgb(252, 151, 85)!important;
    box-shadow: 4px 5px rgba(99, 36, 0, 0.856);
    border-radius: 30px;
    padding: 5px;
  }

  .card-img-top {
    width: 55%;
    height: 45%;
    object-fit: cover;
    margin: auto;
    border-radius: 100px;
    border-color:rgb(161, 6, 6);
    background-color: rgb(255, 255, 255)!important;

    border-width:200px ;
    box-shadow: 1px 1px 1px 1px rgb(2, 2, 2);

    /* background-color: rgba(219, 157, 0, 0.966); */
}
  .card-title{
    font-size: 13px!important;
    font-weight:bold;
    text-align: center;
  }


</style>

