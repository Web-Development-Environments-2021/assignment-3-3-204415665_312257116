<template>
  <div>
    <b-pagination
      v-model="future_currentPage"
      :total-rows="rows"
      :per-page="future_perPage"
      aria-controls="future-matches-pagination"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ future_currentPage }}</p>

    <b-table
      id="future-matches-table"
      :items="futureMatches"
      :per-page="future_perPage"
      :current-page="future_currentPage"
      :busy="future_isBusy"
      small>
    <template #table-busy>
        <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
        </div>
    </template>
    </b-table>
  </div>


    <!-- <div class="container">
        <h1 class="title">League Management</h1>
        <h2> Future Matches </h2>
        <span v-for="g in futureMatches" :key="g.id">
            <FutureMatchPreview
                
                :matchID="g.matchID" 
                :matchDate="g.matchDate" 
                :localTeamName="g.localTeamName" 
                :visitorTeamName="g.visitorTeamName" 
                :venueName="g.venueName" 
                :refereeInformation="g.refereeInformation"
                >
            </FutureMatchPreview>
        </span>
        <h2> Past Matches </h2>
        <PastMatchPreview
            v-for="g in pastMatches"
            :matchID="g.matchID" 
            :matchDateAndTime="g.matchDateAndTime" 
            :localTeamName="g.localTeamName" 
            :visitorTeamName="g.visitorTeamName" 
            :venueName="g.venueName" 
            :localTeamScore="g.localTeamScore"
            :visitorTeamScore="g.visitorTeamScore"
            :refereeInformation="g.refereeInformation"
            :eventsLog="g.eventsLog"
            :key="g.id">
        </PastMatchPreview>
    </div> -->
</template>


<script>
import FutureMatchPreview from "../../components/matches/matches_futureMatchPreview"
import PastMatchPreview from "../../components/matches/matches_pastMatchPreview"
export default {
    name: "leagueManagement",
    components: {
        // FutureMatchPreview,
        // PastMatchPreview
    },
    data(){
        return {
            pastMatches: [],
            futureMatches: [],

            future_perPage: 10,
            future_currentPage: 1,
            future_isBusy: true
        }
    },

    computed: {
        rows(){
            return this.futureMatches.length;
        }
    },

    mounted(){
        
        this.future_isBusy = true;
        this.pastMatches.push(...this.$root.store.leaguePastMatches);
        this.futureMatches.push(...this.$root.store.leagueFutureMatches);
        console.log("League Management Mounted");
        this.future_isBusy=false;
    }

}
</script>


<style>
#future-matches-table {
  margin: 10px 0 10px;
  width: 90%;
}
</style>