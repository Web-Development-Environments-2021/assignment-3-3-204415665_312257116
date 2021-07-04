
<template>

      <div class="container " style="padding-top: 10px;">
        <div class="row" >
        <div v-for="(g,index) in futureMatches" v-bind:key="g.matchID">
          <div class="col-sm-4 " >
            <div class="match-card card text-white card-has-bg click-col">
            <img class="card-img d-none" src="https://source.unsplash.com/600x900/?tech,street" alt="Goverment Lorem Ipsum Sit Amet Consectetur dipisi?">
              <div class="card-img-overlay d-flex flex-column">
                <div class="card-body">
                    <small class="card-meta mb-2"></small>
                    <h4 class="card-title mt-0" :v-if="index<3">
                      <!-- <a class="text-white" herf="#"> -->
                        <div :title="g.matchID" class="future-match-title">
                          <b>Match Id:</b> {{ g.matchID }}
                        </div>
                        <ul class="future-match-content">
                          <!-- <b id="teams">Local team:</b> <a></a><b id="teams">Visitor team:</b> -->
                          <a id="teamsName"> {{ g.localTeamName }}  VS  {{ g.visitorTeamName }}</a><br><hr>
                          
                          <li> Venue: {{ g.venueName }}</li>
                          <li> Referee Information:
                            <referee-information v-if="g.hasRefereeInfo"
                              :refereeID="g.refereeInformation.refereeID"
                              :firstname="g.refereeInformation.firstname"
                              :lastname="g.refereeInformation.lastname"
                              :course="g.refereeInformation.course">
                            </referee-information>
                          </li>
                        </ul>
                      <!-- </a> -->
                    </h4>
                    <small>{{ g.matchDate.slice(0,10)}} , {{ g.matchDate.slice(11,)}} </small>
                </div>
                <div class="card-footer">
                  <div class="media">
                      <!-- <img class="mr-3 rounded-circle" src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/male-512.png" alt="Generic placeholder image" style="max-width:30px;right:0px">
                      <div class="media-body">
                          <small>{{ $root.store.username }}</small>
                      </div> -->
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

import FutureMatchPreview from "./matches/matches_futureMatchPreview";
import RefereeInformation from "./RefereeInformation";

export default {
  name: "FavoriteMatches",
  components: {
    RefereeInformation
  },
  computed: {
      hasRefereeInfo(){
        return Object.keys(this.refereeInformation).length
      }
  }, 
  data() {
    return {
      futureMatches: [
        {
          matchID:25,
          matchDate: "08-08-2021 20:00:00",
          localTeamName: "Maccabi Tel-Aviv",
          visitorTeamName: "Hapoel Beer-Sheva",
          venueName: "Teddy",
          refereeInformation: {
            refereeID: 2,
            firstname: "dini",
            lastname: "pinchas",
            course: "Regular"
          }
        },
        {
          matchID:39,
          matchDate: "10-10-2021 19:00:00",
          localTeamName: "Hapoel Tel-Aviv",
          visitorTeamName: "Maccabi Haifa",
          venueName: "Bloom",
          refereeInformation: {}
        }
      ],
      
    };
  },

  methods: {
    // date2String(date){
    //   let newdate=new Date(date);
    //   return newdate.toDateString();
    // },
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
      min-width: 300px !important;
      background-image:url('../assets/AdobeStock_204313610.jpeg');
      background-size: cover;
  }
  li{
      font-size: 12px!important;
  }
  .future-match-title{
    font-size: 16px!important;
    text-align: center;
  }
  #teamsName{
    font-size: 14px!important;
    text-align: center!important;
    // padding-inline: 20px;
  }
    #teams{
    font-size: 12px!important;
    text-align: center;
    padding: 0px;
    padding-inline: 20px;
  }
</style> 

