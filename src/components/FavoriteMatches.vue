<template>
  <div>
    <future-match-preview
      v-for="g in futureMatches"
      :matchID="g.matchID" 
      :matchDate="g.matchDate" 
      :localTeamName="g.localTeamName" 
      :visitorTeamName="g.visitorTeamName" 
      :venueName="g.venueName" 
      :refereeInformation="g.refereeInformation"
      :key="g.id">
    </future-match-preview>
  </div>
</template>

<script>

import FutureMatchPreview from "./matches/matches_futureMatchPreview";

export default {
  name: "FavoriteMatches",
  components: {
    FutureMatchPreview
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
