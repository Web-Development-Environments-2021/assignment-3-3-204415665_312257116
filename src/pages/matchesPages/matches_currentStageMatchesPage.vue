
<template>
    <div class="container " style="padding-top: 15px;">
      <div class="row" v-if="loadingFlag">
        <div v-for="g in currentStageMatches" v-bind:key="g.matchID" style="padding-top: 15px;">
          <div class="col-sm-4">
           <div class="match-card card text-white card-has-bg click-col">
            <!-- <img class="card-img d-none" src="https://source.unsplash.com/600x900/?tech,street" alt="Goverment Lorem Ipsum Sit Amet Consectetur dipisi?"> -->
              <div class="card-img-overlay d-flex flex-column">
                <div class="card-body">                         
                    <h4 class="card-title mt-0" >
                      <!-- <a class="text-white" herf="#"> -->
                        <div :title="g.matchID" class="match-title">
                            <a style="color: #000;">Match Id:{{ g.matchID }}</a>
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
                    <b-button v-if="myToggleCheck(g)" style="float:right;" @click="clickHandler(g)" :pressed="g.myToggle" variant="outline-warning"> ⭐ </b-button>
                     <!-- <p style="position: absolute; top:225px;left: 270px;"><strong>{{ g.myToggle }}</strong></p> -->
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- <loading/> -->
      </div>
      </div>
</template>

<script>

import RefereeInformation from "../../components/RefereeInformation";
import Loading from "../../components/loading";

export default {
  name: "CurrentStageMatches",
  components: {
    RefereeInformation,
    // Loading
  },
  
  data() {
    return {
      currentStageMatches:[],
      pastStageMatches:[],
      FutureStageMatches:[],
      updateInterval: undefined,
      loadingFlag:false,
    };
  },
  methods: {
    hasRefereeInfo(element){
      if(element?.refereeInformation==undefined){
        return false
      }
      return Object.keys(element.refereeInformation).length;
      
    },

    async clickHandler(g){
      try{
        let response;
        let favoriteMatches =[];
        console.log(JSON.stringify(localStorage.getItem("UserFavoriteMatches")));

        if (JSON.stringify(localStorage.getItem("UserFavoriteMatches"))!="[]"){
            favoriteMatches.push(...JSON.parse(localStorage.getItem("UserFavoriteMatches")));
        }
        g.myToggle = !g.myToggle;
        this.FutureStageMatches?.map(Stage =>{
            if(Stage.matchID==g.matchID){
              Stage.myToggle=g.myToggle;
            }
          }  
        );
        localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(this.FutureStageMatches));

        if(g.myToggle==false){
          favoriteMatches = favoriteMatches?.filter(function(value){ 
            return value.matchID != g.matchID;
          });
          response = await this.DeleteFavoriteMatches(g.matchID);
          this.$root.toast("status", "The game was successfully removed from favorites", "success");
        }
        else if(g.myToggle==true){
          favoriteMatches.push(g);
          response = await this.postFavoriteMatches(g.matchID);
          this.$root.toast("status", "The game was successfully added to favorites", "success");
          console.log(response);
        }
        localStorage.setItem("UserFavoriteMatches", JSON.stringify(favoriteMatches));
        console.log("done - Game update ");
      }
      catch
      {
        this.$root.toast("Error", "Multiple clicks - the game has been added once", "failure");
      }
    },

      async postFavoriteMatches(matchID){
        try{
            console.log("done - Game update ");

            this.axios.defaults.withCredentials = true;
            const response = await this.axios.post(
                this.$root.store.serverUrl + "users/favoriteMatches",
                {
                  matchId:matchID
                }
            );
            this.axios.defaults.withCredentials = false;
            console.log("POST done - Favorite Matches update ");

            return response;

        } catch (error){
          // TODO: What to do We The Error ???
        }
    },

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

    myToggleCheck(g){
        return g?.myToggle!=undefined;
    },

    combineMatches(){

    },

    updateFavoriteMatches(){
      var neededUpdateFlag=false;
      if ( (localStorage.getItem("CurrentStageMatchesFutureMatches")).length!=0 ){
        if (!(JSON.stringify(this.FutureStageMatches) === JSON.stringify(JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches"))))) {
            neededUpdateFlag=true;
            this.FutureStageMatches = [];
            this.FutureStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));
        }
      }
      if ((localStorage.getItem("CurrentStageMatchesPastMatches")).length!=0 ){
        if (!(JSON.stringify(this.pastStageMatches) === JSON.stringify(JSON.parse(localStorage.getItem("CurrentStageMatchesPastMatches"))))) {
            neededUpdateFlag=true;
            this.pastStageMatches = [];
            this.pastStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesPastMatches")));
        }
      }
      if(neededUpdateFlag){
        this.loadingFlag=true;
        this.currentStageMatches=[];
        this.currentStageMatches=this.FutureStageMatches;
        this.currentStageMatches = this.currentStageMatches.concat(this.pastStageMatches);
      }
    }
  },
  mounted()  {
    this.updateInterval = setInterval( this.updateFavoriteMatches, 100 );
    console.log("favorite games mounted");
  },

  beforeDestroy(){
    clearInterval(this.updateMatches);
  },

};
</script>

<style lang="scss" scoped>
  .card{
      min-height: 250px !important;
      min-width: 330px !important;
      background-image:url('../../assets/AdobeStock_203017792.jpeg');
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

