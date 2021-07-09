
<template>
  <div class="page">
    <div v-if="loadingFlag" class="container">
      <div class="row my-row">
        <div class="Stage-title">
          <h1 >Future Stage Matches</h1>
        </div>
        <div v-for="g in FutureStageMatches" v-bind:key="g.matchID" style="padding-top: 15px;padding-bottom: 15px;">
          <div class="col-sm-4">
          
                
           <div class="match-card card text-white card-has-bg click-col">
              <div class="card-img-overlay d-flex flex-column">
                <div class="card-body">                         
                    <h4 class="card-title mt-0" >
                        <div :title="g.matchID" class="match-title">
                          <a style="color: #000;">Match Id:{{ g.matchID }}</a>
                        </div>
                        <div class="future-match-content">                                           
                          <div class="row" >     
                          <div class="teamsName"> {{ g.localTeamName }} VS {{ g.visitorTeamName }}</div><br><hr>
                        </div>
                          <div class=match-info> Venue: {{ g.venueName }}</div>
                          <!-- <div class=match-info v-if="hasRefereeInfo(g)"> Referee Information:
                            <referee-information 
                              :refereeID="g.refereeInformation.refereeID"
                              :firstname="g.refereeInformation.firstname"
                              :lastname="g.refereeInformation.lastname"
                              :course="g.refereeInformation.course">
                            </referee-information>
                          </div> -->
                        </div>
                    </h4>
                  <small class="card-meta" style="float:right;">match date: {{g.matchDate.slice(0,10)}} , {{ g.matchDate.slice(11,16)}}</small>
                </div>
                <div class="like-div">
                  <b-button v-if="myToggleCheck(g)" style="float:right;" @click="clickHandler(g)" :pressed="g.myToggle" variant="outline-warning"> ⭐ </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loadingFlag" class="container " style="padding-top: 15px;">

      <div class="row my-row">

        <div class="Stage-title" style="text-align: center;">
          <h1 >Past Stage Matches</h1>
        </div>

        <div v-for="g in pastStageMatches" v-bind:key="g.matchID" style="padding-top: 15px;padding-bottom: 15px;">

          <div class="col-sm-4">

          <div class="match-card card text-white card-has-bg click-col">
          <div class="card-img-overlay d-flex flex-column">
            <div class="card-body">                         
              <h4 class="card-title mt-0" >
                <div :title="g.matchID" class="match-title">
                  <a style="color: #000;">Match Id:{{ g.matchID }}</a>
                </div>
                <div class="future-match-content">                                           
                  <div class="row" >     
                    <div class="teamsName"> {{ g.localTeamName }} VS {{ g.visitorTeamName }}</div><br><hr>
                  </div>
                  <div class=match-info> Venue: {{ g.venueName }}</div>
                        <!-- <div class=match-info v-if="hasRefereeInfo(g)"> Referee Information:
                          <referee-information 
                            :refereeID="g.refereeInformation.refereeID"
                            :firstname="g.refereeInformation.firstname"
                            :lastname="g.refereeInformation.lastname"
                            :course="g.refereeInformation.course">
                          </referee-information>
                        </div> -->
                  </div>
              </h4>
              <small class="card-meta" style="float:right;">match date: {{g.matchDate.slice(0,10)}} , {{ g.matchDate.slice(11,16)}}</small>
            </div>
              <div>
                <b-button id="like-button" v-if="myToggleCheck(g)" style="float:right;" @click="clickHandler(g)" :pressed="g.myToggle" variant="outline-warning"> ⭐ </b-button>
              </div>
              <div class="model-div">
                <model-view :body="g.matchID" :buttonName="'show eventLog'"/>
              </div>
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
import Loading from "../../components/loading";
import ModelView from "../../components/model"
export default {
  name: "CurrentStageMatches",
  components: {
    ModelView

    // RefereeInformation,
    // Loading
  },
  
  data() {
    return {

      pastStageMatches:[],
      FutureStageMatches:[],
      updateInterval: undefined,
      loadingFlag:false,
      modalShow:false

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

        var favoriteMatches =[];

        if (localStorage.getItem("UserFavoriteMatches").length!=0){
            favoriteMatches.push(...JSON.parse(localStorage.getItem("UserFavoriteMatches")));
        }

        g.myToggle =! g.myToggle;
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

          const response = await this.DeleteFavoriteMatches(g.matchID);
          this.$root.toast("status", "The game was successfully removed from favorites", "success");
        }

        else if(g.myToggle==true){

          const response = await this.postFavoriteMatches(g.matchID);
          favoriteMatches.push(g);
          this.$root.toast("status", "The game was successfully added to favorites", "success");          
        }

        localStorage.setItem("UserFavoriteMatches", JSON.stringify(favoriteMatches));
        console.log("done - Game update ");

      }catch
      {
        this.$root.toast("Error", "Multiple clicks - the game has been added once", "failure");
      }

    },

    
    myToggleCheck(g){
        return g?.myToggle!=undefined;
    },

    updateCurrentStage(){

      if ( (localStorage.getItem("CurrentStageMatchesFutureMatches")).length!=0 )
      {
        if (!(JSON.stringify(this.FutureStageMatches) === JSON.stringify(JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")))))
        {
            this.FutureStageMatches = [];
            this.FutureStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));

            if(this.$root.store?.username!=undefined)
            {
              this.FutureStageMatches?.map(fav => fav.myToggle=false);
              let UserFavoriteMatches =[];
              if ((localStorage.getItem("UserFavoriteMatches")).length!=0 ){
                

                UserFavoriteMatches.push(...JSON.parse(localStorage.getItem("UserFavoriteMatches")));

                this.FutureStageMatches?.map(Stage =>
                  UserFavoriteMatches?.map(fev =>
                  {
                    if(fev.matchID==Stage.matchID)
                    {
                      Stage.myToggle=true;
                    }
                  })
                );
                localStorage.setItem("CurrentStageMatchesFutureMatches", JSON.stringify(this.FutureStageMatches));
                this.loadingFlag=true;
              }

            }

        }

        if ((localStorage.getItem("CurrentStageMatchesPastMatches")).length!=0)
        {
          if (!(JSON.stringify(this.pastStageMatches) === JSON.stringify(JSON.parse(localStorage.getItem("CurrentStageMatchesPastMatches"))))) 
          {
              this.pastStageMatches = [];
              this.pastStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesPastMatches")));
              this.loadingFlag=true;

          }
        }
      }
    },
    async postFavoriteMatches(matchID){

      try{
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

      }catch (error){
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

  },

  mounted()  
  {
    this.updateInterval = setInterval( this.updateCurrentStage(), 100 );  
  },

  beforeDestroy()
  {
    clearInterval(this.updateMatches);
  },
};
</script>

<style lang="scss" scoped>
  .card{
      min-height: 120px !important;
      min-width: 340px !important;
      background-image:url('../../assets/AdobeStock_203017792.jpeg');
      font-size: 17px;
  }
  .my-row{
    background-color: #293241e0;
    border-radius: 10px;
    overflow-y: scroll;
    overflow-x: hidden;

  }

  .match-title{
    font-size: 25px!important;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    text-align: center;
    position: absolute;
    top:10px;
    left: 100px;
    margin: auto;
    color: rgb(32, 32, 32);
    
  }

  .teamsName{
    position: relative;
    top: 0px;
    // width: 200px;
    // word-wrap: break-word;
    font-size: 15px!important;
  }

  .match-info{
    position: relative;
    top: -10px;
    font-size: 12px!important;
    text-align: left;
    padding: 3px;
  }
  small{
    position: absolute;
    top: 210px;
  }
  h1{
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 40px!important;
  }
  .Stage-title{
    min-width: 1140px;
    padding-top: 10px;
  }
  .page{
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 10px;
      min-height: 93.4vh;

  }
  .model-div{
      position:relative;
      top: 10px;
      left: 170px;
  }
    .like-div{
      position:relative;
      top: 10px;
      left: 13px;
  }

</style> 

