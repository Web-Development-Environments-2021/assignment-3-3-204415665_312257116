
<template>
    <div class="container " style="padding-top: 15px;">
      <div class="row" >
        <div v-for="(g,index) in FavoriteMatchesList" v-bind:key="g.matchID">
          <div v-if="index < 3" class="col-sm-4">
           <div class="match-card card text-white card-has-bg click-col">
            <!-- <img class="card-img d-none" src="https://source.unsplash.com/600x900/?tech,street" alt="Goverment Lorem Ipsum Sit Amet Consectetur dipisi?"> -->
              <div class="card-img-overlay d-flex flex-column">
                <div class="card-body">                         
                    <h4 class="card-title mt-0" >
                      <!-- <a class="text-white" herf="#"> -->
                        <div :title="g.matchID" class="match-title">
                          <a>Match Id:</a> {{ g.matchID }}
                          
                        </div>
                        <div class="future-match-content">
                                                   
                          <div class="row" >
                            
                          <div class="teamsName"> {{ g.localTeamName }} VS {{ g.visitorTeamName }}</div>
                          <!-- <div class="teamsName col">   </div>
                          <div class="teamsName col"></div> -->
                          <br><hr>
                        </div>
                          <div class=match-info> Venue: {{ g.venueName }}</div>
                          <div class=match-info v-if="hasRefereeInfo(g)"> Referee Information:
                            <referee-information 
                              :refereeID="g.refereeInformation.refereeID"
                              :firstname="g.refereeInformation.firstname"
                              :lastname="g.refereeInformation.lastname"
                              :course="g.refereeInformation.course">
                            </referee-information>
                          </div>
                        </div>
                    </h4>
                  <small class="card-meta" style="float:right;">match date: {{g.matchDate.slice(0,10)}} , {{ g.matchDate.slice(11,16)}}</small>

                </div>
                  <div>
                      <div class='form-check form-switch'>
                      </div>
                   <b-button style="float:right;" @click="clickHandler(g)" :pressed="g.myToggle" variant="outline-warning"> ⭐ </b-button>
                     <!-- <p style="position: absolute; top:225px;left: 270px;"><strong>{{ g.myToggle }}</strong></p> -->
                  </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
</template>

<script>

import RefereeInformation from "./RefereeInformation";
export default {
  name: "FavoriteMatches",
  components: {
    RefereeInformation,
  },
  data() {
    return {
      FavoriteMatchesList: [],
    };
  },
  computed: {
  
  },
  mounted(){
    this.FavoriteMatchesInit();
  },
  
  methods: {
      hasRefereeInfo(element){
        return Object.keys(element?.refereeInformation).length ;
      },

      FavoriteMatchesInit(){
        this?.FavoriteMatchesList.push(...JSON.parse(localStorage.getItem("UserFavoriteMatches")));
      },

      async clickHandler(g){
        // console.log(g.myToggle);
        // if(g.myToggle==true){
        //   await this.DeleteFavoriteMatches(g.matchId)
        // }
        // else if(g.myToggle==false){
        //   await this.postFavoriteMatches(g.matchId)
        // }
        // localStorage.removeItem("UserFavoriteMatches");
        // await this.$root.store.initDataForUser();

        // console.log("done - Game update ");
        g.myToggle = !g?.myToggle
      },

      async postFavoriteMatches(matchId){
          try{
              // axios.withCredentials = true;
              const response = await axios.post(
                  this.serverUrl + "users/favoriteMatches",{params:{matchId:matchId}}
              );
              // axios.withCredentials = false;
              console.log("POST done - Favorite Matches update ");

              return response;

          } catch (error){
            // TODO: What to do We The Error ???
          }
        },

      async DeleteFavoriteMatches(matchId){
          try{
              // axios.withCredentials = true;
              const response = await axios.delete(
                  this.serverUrl + "users/favoriteMatches",{params:{matchId:matchId}}
              );
              // axios.withCredentials = false;
              console.log("delete done - Favorite Matches update ");
              return response;
              

          } catch (error){
            // TODO: What to do We The Error ???
          }
        },


    
  //   async updateGames(){
  //     console.log("response");
  //     try {
  //       const response = await this.axios.get(
  //         "http://localhost:3000/games/favoriteGames",
  //       );
  //       const games = response.data.games;
  //       this.games = [];
  //       this.games.push(...games);
  //       console.log(response);
  //     } catch (error) {
  //       console.log("error in update games")
  //       console.log(error);
  //     }
  //   }
  // }, 
  // mounted(){
  //   console.log("favorite games mounted");
  //   this.updateGames(); 
  }
};
</script>

<style lang="scss" scoped>
  .card{
      min-height: 250px !important;
      min-width: 330px !important;
      background-image:url('../assets/AdobeStock_203017792.jpeg');
      // background-size: cover;
      font-size: 17px;

  }
  .match-title{
    font-size: 25px!important;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    text-align: center;
    position: absolute;
    top:30px;
    left: 100px;
    margin: auto;
    color: rgb(32, 32, 32);
  }

  .teamsName{
    position: absolute;
    top: 75px;
    left: 20px;
    text-align: center;
    // width: 200px;
    // word-wrap: break-word;
    font-size: 15px!important;
  }

  .match-info{
    position: relative;
    top: 25px;
    font-size: 12px!important;
    text-align: left;
    padding: 3px;
  }
  small{
    position: absolute;
    top: 210px;
  }
</style> 

