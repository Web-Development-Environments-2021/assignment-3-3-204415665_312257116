
<template>
    <div class="container " style="padding-top: 15px;">
      <!------------------------ display ------------------------>
      <div class="row" v-if="loadingFlag">
      <!----------------------- no contact ---------------------->
        <div v-if="resultFlag" style="padding-top: 15px;">
            <div class="match-card noContact card text-white card-has-bg click-col">
              <div class="card-img-overlay d-flex flex-column">
                <div class="card-body" >                         
                  <h4 class="card-title mt-0">
                    <!-- <a class="text-white" herf="#"> -->
                      <div style="text-align:center;">
                          <a>You have no favorite games at the moment<br>To add, click here</a><br><br>
                          <b-button @click="moveToCurrentMatch" variant="primary">Add matches</b-button>
                      </div>
                    </h4>
                  </div>
                </div>
              </div>
        </div>

      <!---------------------- have contact ---------------------->
        <div v-else v-for="(g,index) in favoriteMatchesList" v-bind:key="g.matchID"  style="padding-top: 15px;">
            <div v-if="index < 3" class="col-sm-4">
              <div class="match-card favoriteMatches card  text-white card-has-bg click-col">
                <div class="card-img-overlay d-flex flex-column">
                  <div class="card-body">                         
                      <h4 class="card-title mt-0" >
                        <!-- <a class="text-white" herf="#"> -->
                          <div :title="g.matchID" class="match-title">
                              <a>Match Id:{{ g.matchID }}</a> 
                          </div>
                          <div class="future-match-content">                                           
                            <div class="row" >     
                              <div class="teamsName">
                                {{ g.localTeamName }} VS {{ g.visitorTeamName }}
                              </div>
                              <br><hr>
                          </div>
                          <div class=match-info>
                            Venue: {{ g.venueName }}
                          </div>
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
                      <b-button style="float:right;" @click="clickHandler(g)" v-bind:pressed="g.myToggle" variant="outline-warning"> ⭐ </b-button>
                      <!-- <p style="position: absolute; top:225px;left: 270px;"><strong>{{ g.myToggle }}</strong></p> -->
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <!------------------------ loading  ------------------------>
      <div v-else>
        <loading/>
      </div>
      </div>
</template>

<script>

import RefereeInformation from "./RefereeInformation";
import Loading from "./loading";
import currentStageMatches from "../pages/matchesPages/matches_currentStageMatchesPage"

export default {
  name: "FavoriteMatches",
  components: {
    RefereeInformation,
    Loading,
    // currentStageMatches
  },
  data() {
    return {
      favoriteMatchesList:[],
      updateInterval: undefined,
      loadingFlag:false,
      resultFlag:false
    };
  },
  methods: {
    hasRefereeInfo(element){
      if(element?.refereeInformation==undefined){
        return false
      }
      return Object.keys(element.refereeInformation).length;
    },


// ------------------------------------------clickHandler------------------------------------------
    async clickHandler(g){
      try{
          let response;
          let currentStageMatches=[];
          currentStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));
          g.myToggle = !g.myToggle;
          currentStageMatches?.map(Stage =>{
            if(Stage.matchID==g.matchID){
              Stage.myToggle=g.myToggle;
            }
          });

          if(g.myToggle==false){
            response = await this.DeleteFavoriteMatches(g.matchID);
            if(response.status < 400){
              this.favoriteMatchesList = this.favoriteMatchesList?.filter(function(value){ 
                return value.matchID != g.matchID;
              });
            }
          }
          console.log(response);
          localStorage.setItem("UserFavoriteMatches", JSON.stringify(this.favoriteMatchesList));
          localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(currentStageMatches));
          console.log("done - Game update ");
          this.$root.toast("status", "The game was successfully removed from favorites", "success");

      }catch
      {
        this.$root.toast("Error", "Multiple clicks - the game has been added once", "failure");
      }
      
    },

/**
 * ------------------------------------------clickHandler------------------------------------------
 */
    async DeleteFavoriteMatches(matchID){
        try{
            this.axios.defaults.withCredentials = true;
            const response = await this.axios.delete(
                this.$root.store.serverUrl + "users/favoriteMatches?matchID=" + matchID
            );
            this.axios.defaults.withCredentials = false;
            console.log("delete done - Favorite Matches update");
            return response;
            
        } catch (error){
          // TODO: What to do We The Error ???
        }
    },

//**------------------------------updateFavoriteMatches------------------------------------ */
    updateFavoriteMatches(){  
      if ((localStorage.getItem("UserFavoriteMatches")).length!=0 ){
        if ( !(JSON.stringify(this.favoriteMatchesList) === JSON.stringify(JSON.parse(localStorage.getItem("UserFavoriteMatches"))))) {
            this.favoriteMatchesList = [];
            this.loadingFlag=true;
            this.favoriteMatchesList.push(...JSON.parse(localStorage.getItem("UserFavoriteMatches")));
            this.updatedChanges();
        }
      }     
      if(this.favoriteMatchesList.length==0){
        this.loadingFlag=true;
        this.resultFlag=true;
      }else{
        this.loadingFlag=true;
        this.resultFlag=false;
      }


    },
    moveToCurrentMatch() {
        this.$router.push("/matches/currentStageMatches");
    },

    updatedChanges(){ 
      let currentStageMatches =[];
      currentStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));
      currentStageMatches?.map(Stage =>
        this.favoriteMatchesList?.map(fev =>
        {
          if(fev.matchID==Stage.matchID){
            Stage.myToggle=true;
          }
        })
      );
      localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(currentStageMatches));
    }
  },
  //**--------------------------------------------mounted------------------------------------ */
  mounted()  {
    this.updateInterval = setInterval( this.updateFavoriteMatches, 100 );
    console.log("favorite games mounted");
  },
 //**--------------------------------------------beforeDestroy------------------------------------ */
  beforeDestroy(){
    clearInterval(this.updateMatches);
  },



};
</script>

<style lang="scss" scoped>
  .match-card.noContact.card{
      min-height: 200px !important;
      min-width: 500px !important;
      font-size: 17px;
      left: 20px;
  }
  .container{
      left: 0px!important;
      position: absolute!important;
  }
  
  .match-card.favoriteMatches.card{
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

