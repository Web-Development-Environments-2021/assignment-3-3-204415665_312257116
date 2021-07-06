 
<template>
    <div class="container " style="padding-top: 15px;">
      <!-- <div class="row" >
        <div v-for="g in leagueMatches" v-bind:key="g.matchID">
          <div class="col-sm-4">
           <div class="match-card card text-white card-has-bg click-col">
              <div class="card-img-overlay d-flex flex-column">
                <div class="card-body">                         
                    <h4 class="card-title mt-0" >
                        <div :title="g.matchID" class="match-title">
                          <a>Match Id:</a> {{ g.matchID }}
                          
                        </div>
                        <div class="future-match-content">
                                                   
                          <div class="row" >
                            
                          <div class="teamsName"> {{ g.localTeamName }} VS {{ g.visitorTeamName }}</div>

                          <br><hr>
                        </div>
                          <div class=match-info> Venue: {{ g.venueName }}</div>
                          <div class=match-info :v-if="this.hasRefereeInfo(g)"> Referee Information:
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
                  </div>
              </div>
            </div>
          </div>
        </div>
        </div> -->
      </div>
</template>

// <script>

// import RefereeInformation from "../../components/RefereeInformation.vue";
// export default {
//   name: "matches_currentStageMatchesPage",
//   components: {
//     // RefereeInformation,
//   },
//   data() {
//     return {
//       leagueMatches:[],
//     };
//   },


//   methods: {
//       hasRefereeInfo(g){
//         return g?.refereeInformation;

//       },
//       async clickHandler(g){
//         // console.log(g);
//         // let filter; 
//         // let response;
//         // if(g.myToggle==true){
//         //   response = await this.DeleteFavoriteMatches(g.matchID);
//         //   this.FavoriteMatchesList = this.FavoriteMatchesList.filter(function(value){ 
//         //       return value.matchID != g.matchID;
//         // });
//         // }
//         // else if(g.myToggle==false){
//         //   response = await this.postFavoriteMatches(g.matchID);
//         //   console.log(response);
//         //   this.FavoriteMatchesList.push(g);
//         // }
 
//         // g.myToggle = !g.myToggle;

//         // localStorage.setItem("UserFavoriteMatches", JSON.stringify(this.FavoriteMatchesList));
//         // console.log(this.FavoriteMatchesList);
//         console.log("done - Game update ");
//       },
//   },
//   mounted()  {
//     this.leagueMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesFutureMatches")));
//     this.leagueMatches.push(...JSON.parse(localStorage.getItem("CurrentStageMatchesPastMatches")));
//     console.log(leagueMatches);
//     console.log("favorite games mounted");
//   }
// };
// </script>

// <style lang="scss" scoped>
//   .card{
//       min-height: 250px !important;
//       min-width: 330px !important;
//       background-image:url('../../assets/AdobeStock_203017792.jpeg');
//       // background-size: cover;
//       font-size: 17px;

//   }
//   .match-title{
//     font-size: 25px!important;
//     font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
//     text-align: center;
//     position: absolute;
//     top:30px;
//     left: 100px;
//     margin: auto;
//     color: rgb(32, 32, 32);
//   }

//   .teamsName{
//     position: absolute;
//     top: 75px;
//     left: 20px;
//     text-align: center;
//     // width: 200px;
//     // word-wrap: break-word;
//     font-size: 15px!important;
//   }

//   .match-info{
//     position: relative;
//     top: 25px;
//     font-size: 12px!important;
//     text-align: left;
//     padding: 3px;
//   }
//   small{
//     position: absolute;
//     top: 210px;
//   }
// </style> 

