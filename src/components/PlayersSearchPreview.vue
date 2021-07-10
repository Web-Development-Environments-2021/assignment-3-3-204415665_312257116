<template>
  <div style="padding: 5px;">
    <b-card-group id="div-card" deck>
      <b-card 
        style=""
        tag="article"
        class="mb-2 my-card" >

      <router-link :to="`/players/playerDetails/${ this.player.playerID }`" id="img-route" >
          <b-card-img 
              :src="this.player.image"
              img-alt="Image"
              img-top >
          </b-card-img>
      </router-link>

      <b-card-title>
        <router-link :to="`/players/playerDetails/${ this.player.playerID }`" class="player-link-text" >
            {{ this.player.name }}
        </router-link>
      </b-card-title>
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
  width: 13rem!important;
  height: 17rem!important;
  font-size: 12.5px!important;
  background-color: rgba(255, 255, 255, 0.952)!important;
  box-shadow: 4px 5px rgba(74, 168, 223, 0.856);
  border-radius: 15px;
  padding: 4px;
}

.card-img-top {
  width: 50%;
  height: 50%;
  object-fit: cover;
  margin: auto;
  border-radius: 100px;
  background-color: rgb(255, 255, 255)!important;
  border-width:200px ;
  box-shadow: 1px 1px 1px 1px rgba(2, 2, 2, 0.39);
}
.card-title{
  font-size: 13px!important;
  font-weight:bold;
  text-align: center;
}

.player-link-text {
  font-size: 13px!important;
  font-weight:bold;
  text-align: center;
  color: black;
}

.player-link-text:hover {
  color: blue;
}

#img-route {
  text-align: center;
  align-items: center;
}

</style>

