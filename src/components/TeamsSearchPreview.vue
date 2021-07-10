<template>
  <div style="padding: 5px;">
    <b-card-group id="div-card" deck>
      <b-card 
        style=""
        tag="article"
        class="mb-4 my-card"
      >
        <router-link :to="`/teams/teamDetails/${ this.team.teamName }`" class="teams-names" >
          <b-card-img id="img-route"
              :src="this.team.teamLogo"
              img-alt="Image"
              img-top >
          </b-card-img>
        </router-link>
        <b-card-title id="title-route">
          <router-link :to="`/teams/teamDetails/${ this.team.teamName }`" class="teams-names" >
              {{ this.team.teamName }}
          </router-link>
        </b-card-title>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>

export default {

  name: "PlayersInformation",

  props: {
    team: {
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
  font-size: 15.5px!important;
  background-color: rgb(255, 255, 255)!important;
  box-shadow: 3px 3px rgba(0, 141, 223, 0.856);
  border-radius: 10px;
  border-color: black;
  padding: 3px;
}

.card-img-top {
  width: 70%;
  height: 75%;
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

.teams-names {
  color: black;
  font-size: 13px!important;
  font-weight:bold;
  text-align: center;
}

.teams-names:hover {
  color: blue;
}

.card-body {
  margin: auto;
}

#img-route {
  text-align: center;
  align-items: center;
}

#title-route {
    font-size: 13px!important;
  font-weight:bold;
  text-align: center;
}

</style>
