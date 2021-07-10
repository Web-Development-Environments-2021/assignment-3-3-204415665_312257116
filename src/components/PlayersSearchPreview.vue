<template>
  <div style="padding: 5px;">
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
    width: 14rem!important;
    height: 13rem!important;
    font-size: 10.5px!important;
    background-color: rgba(255, 255, 255, 0.952)!important;
    box-shadow: 4px 5px rgba(74, 168, 223, 0.856);
    border-radius: 15px;
    padding: 5px;
  }

  .card-img-top {
    width: 55%;
    height: 60%;
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

