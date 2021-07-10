
<template>
  <div class="page">
    <div v-if="loadingFlag" class="container">
      <div class="row my-row">
        <div class="Stage-title">
          <h1 >Future Stage Matches</h1>
        </div>

        <future-match-preview 
            v-for="futureMatch in this.FutureStageMatches" :key="futureMatch.matchID"
            :match="futureMatch"
            v-on:click-handler="clickHandler"  >
        </future-match-preview>
        
      </div>
    </div>

    <div v-if="loadingFlag" class="container " style="padding-top: 15px;">
      <div class="row my-row">
        <div class="Stage-title" style="text-align: center;">
          <h1 >Past Stage Matches</h1>
        </div>

        <past-match-preview 
            v-for="pastMatch in this.pastStageMatches" :key="pastMatch.matchID"
            :match="pastMatch"  > 
        </past-match-preview>

      </div>
    </div>
  </div>
</template>


<script>

import Loading from "../../components/loading";

import FutureMatchPreview from '../../components/matches/matches_futureMatchPreview.vue';
import PastMatchPreview from '../../components/matches/matches_pastMatchPreview.vue';

export default {
  name: "CurrentStageMatches",
  components: {
    FutureMatchPreview,
    PastMatchPreview,
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

    async clickHandler(g){

      try{

        var favoriteMatches =[];

        var userFavorite = JSON.parse(localStorage.getItem("UserFavoriteMatches"));

        if( userFavorite != undefined ) { 

          if ( userFavorite.length!=0 ) {
            favoriteMatches.push(...userFavorite);
          }

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

      }catch
      {
        this.$root.toast("Error", "Multiple clicks - the game has been added once", "failure");
      }

    },
    updateCurrentStage(){

      if ( JSON.parse((localStorage.getItem("CurrentStageMatchesFutureMatches"))) != null )
      {
        if (!(JSON.stringify(this.FutureStageMatches) === JSON.stringify(JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")))))
        {
            this.FutureStageMatches = [];
            this.FutureStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));

            if(this.$root.store?.username!=undefined)
            {
              this.FutureStageMatches?.map(fav => fav.myToggle=false);
              let UserFavoriteMatches =[];
              if (  JSON.parse(localStorage.getItem("UserFavoriteMatches"))!=undefined  && (localStorage.getItem("UserFavoriteMatches")).length!=0 ){
                
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
      }
      if ( JSON.parse(localStorage.getItem("CurrentStageMatchesPastMatches")) != null)
      {
        if (!(JSON.stringify(this.pastStageMatches) === JSON.stringify(JSON.parse(localStorage.getItem("CurrentStageMatchesPastMatches"))))) 
        {
            this.pastStageMatches = [];
            this.pastStageMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesPastMatches")));
            this.loadingFlag=true;

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

          return response;
  
        } catch (error){
          // TODO: What to do We The Error ???
        }
    },
  },

  mounted() {
    this.updateInterval = setInterval( this.updateCurrentStage , 100 );  
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
}

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
    position: relative;
    left: -150px;
    min-height: 500px !important;
    min-width: 1450px !important;

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



  h1{
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 40px!important;
  }

  .Stage-title{
    min-width: 1450px !important;
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

