
<template>
    <div class="container " style="padding-top: 15px;">
      <div class="row" >
        <div v-for="g in currentStageMatches" v-bind:key="g.matchID"  style="padding-top: 15px;">
          <div class="col-sm-4">
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
                    <b-button v-if="myToggleCheck(g)" style="float:right;" @click="clickHandler(g)" :pressed="g.myToggle" variant="outline-warning"> ⭐ </b-button>
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

import RefereeInformation from "../../components/RefereeInformation";
export default {
  name: "CurrentStageMatches",
  components: {
    RefereeInformation,
  },
  data() {
    return {
      currentStageMatches:[],
      updateInterval: undefined,

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

      let response;
      let favoriteMatches =[];
      favoriteMatches.push(...JSON.parse(localStorage.getItem("UserFavoriteMatches")));

      if(g.myToggle==true){
        g.myToggle = !g.myToggle;
        response = await this.DeleteFavoriteMatches(g.matchID);
        favoriteMatches = favoriteMatches?.filter(function(value){ 
            return value.matchID != g.matchID;
      });
      }
      else if(g.myToggle==false){
        g.myToggle = !g.myToggle;
        response = await this.postFavoriteMatches(g.matchID);
        console.log(response);
        favoriteMatches.push(g);
      }
      this.currentStageMatches?.map(Stage =>{
          if(Stage.matchID==g.matchID){
            Stage.myToggle=g.myToggle;
          }
        }  
      );

      localStorage.setItem("UserFavoriteMatches", JSON.stringify(favoriteMatches));
      localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(this.currentStageMatches));

      console.log("done - Game update ");
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

    updateFavoriteMatches(){
      if ( (localStorage.getItem("CurrentStageMatchesFutureMatches")).length!=0 ){
        if (!(JSON.stringify(this.currentStageMatches) === JSON.stringify(JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches"))))) {
            this.currentStageMatches = [];
            this.currentStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));
            // this.currentStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesPastMatches")));
        }
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
  onUpdated(){
    // this.currentStageMatches = [];
    // let favoriteMatches =[];
    // console.log("start onUpdated");
    // favoriteMatches.push(...JSON.parse(localStorage.getItem("UserFavoriteMatches")));
    // this.currentStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));
    // this.currentStageMatches?.map(Stage =>
    //   favoriteMatches?.map(fev =>
    //     {
    //       if(fev.matchID==Stage.matchID){
    //         Stage.myToggle=true;
    //       }
    //     }  
    //   )
    // );
  }
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

