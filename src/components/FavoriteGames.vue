<template>
  <div>
    <FutureMatchPreview
      v-for="g in featureMatches"
      :matchID="g.matchID" 
      :matchDate="g.matchDate" 
      :localTeamName="g.localTeamName" 
      :visitorTeamName="g.visitorTeamName" 
      :venueName="g.venueName" 
      :refereeInformation="g.refereeInformation"
      :key="g.id">
    </FutureMatchPreview>
    <PastMatchPreview>

    </PastMatchPreview>
  </div>
</template>

<script>

import FutureMatchPreview from "./matches/matches_futureMatchPreview";
import PastMatchPreview from "./matches/matches_pastMatchPreview";

export default {
  name: "FavoriteGames",
  components: {
    FutureMatchPreview,
    PastMatchPreview
  }, 
  data() {
    return {
      featureMatches: [
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
      pastMatches: [
        {
          matchID: 10,
          matchDateAndTime: "2020-10-02 15:30:00",
          localTeamName: "Silkeborg",
          visitorTeamName: "København",
          venueName: "Park",
          localTeamScore: 0,
          visitorTeamScore: 0,
          refereeInformation: {
            refereeID: 2,
            firstname: "dini",
            lastname: "pinchas",
            course: "Regular"
          },
          eventsLog: [
            {
              eventID: 10,
              eventTimeAndDate: "2020-08-02 15:30:00",
              minuteInMatch: 10,
              eventType: "Goal",
              eventDescription: "Yellow card to Messi"
            }
          ]
        },
        {
          matchID: 3,
          matchDateAndTime: "2020-08-02 15:30:00",
          localTeamName: "København",
          visitorTeamName: "Silkeborg",
          venueName: "Parken",
          localTeamScore: 5,
          visitorTeamScore: 1,
          refereeInformation: {
            refereeID: 2,
            firstname: "dini",
            lastname: "pinchas",
            course: "Regular"
          },
          eventsLog: []
        }
      ]
    };
  },
  // methods: {
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
  // }
};
</script>

<style></style>
