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
  width: 11rem!important;
  height: 13rem!important;
  font-size: 10.5px!important;
  background-color: rgb(252, 151, 85)!important;
  box-shadow: 4px 5px rgba(99, 36, 0, 0.856);
  border-radius: 30px;
  padding: 5px;
}

.card{
  width: 14rem!important;
  height: 16rem!important;
  font-size: 10.5px!important;
  background-color: rgba(255, 255, 255, 0.952)!important;
  box-shadow: 4px 5px rgba(74, 168, 223, 0.856);
  border-radius: 15px;
  padding: 5px;
}

.card-img-top {
  width: 60%;
  height: 55%;
  object-fit: cover;
  margin: auto;
  border-radius: 100px;
  border-color:rgb(161, 6, 6);
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

