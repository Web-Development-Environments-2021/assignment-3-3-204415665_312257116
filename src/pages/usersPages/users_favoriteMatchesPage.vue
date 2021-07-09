<template>
  <div>
    <favoriteMatches :display="'favorite'"/>
    <!-- <future-match-preview
      v-for="g in MatchesTable"
      :matchID="g.matchID" 
      :matchDate="g.matchDate" 
      :localTeamName="g.localTeamName" 
      :visitorTeamName="g.visitorTeamName" 
      :venueName="g.venueName" 
      :refereeInformation="g.refereeInformation"
      :key="g.id">
    </future-match-preview> -->
  </div> 
</template>

<script>
import FavoriteMatches from "../../components/FavoriteMatches";
import FutureMatchPreview from "../../components/matches/matches_futureMatchPreview";

  export default {
    name:"usersFavoriteMatchesPage",
    components:{
      FavoriteMatches,
      // FutureMatchPreview
    },
    data() {
      return {
        MatchesTable:[]
      }
    },

    methods: {
      async FavoriteMatchesInit() {
        this.MatchesTable.push(...JSON.parse(localStorage.getItem("UserFavoriteMatches")));
        console.log(this.MatchesTable);
      }
    },
    mounted() {
      this.FavoriteMatchesInit()
    },

  }
</script>

<style scoped>
/* div, form,.title, .input-group {
  margin: auto;
  width: 100%;
  padding: 10px;
  text-align: center;
}
div {
margin: auto;
}

button {
  margin: 20px;
  width:100px; 
} */


</style>