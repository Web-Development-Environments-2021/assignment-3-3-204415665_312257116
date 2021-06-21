<template>
    <div class="container">
        <h1 class="title">Main Page</h1>
        <FutureMatchPreview
            v-for="g in futureMatches"
            :matchID="g.matchID" 
            :matchDate="g.matchDate" 
            :localTeamName="g.localTeamName" 
            :visitorTeamName="g.visitorTeamName" 
            :venueName="g.venueName" 
            :refereeInformation="g.refereeInformation"
            :key="g.id">
        </FutureMatchPreview>
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
    </div>
</template>


<script>

import FutureMatchPreview from "../../components/matches/matches_futureMatchPreview"
import PastMatchPreview from "../../components/matches/matches_pastMatchPreview"

export default {
    name: "leagueManagement",

    components: {
        FutureMatchPreview,
        PastMatchPreview
    },

    data(){
        return {
            pastMatches: [],
            futureMatches: [],
        }
    },

    methods: {
        async getLeagueMatches(){
            try{
                this.axios.withCredentials = true;
                const response = await this.axios.get(
                    this.$root.store.serverUrl + "unionAgent/leagueManagementPage"
                );
                console.log(response)

            } catch (error){

            }
        }
    },

    // mounted(){
    //     this.getLeagueMatches()
    // }


}
</script>


<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>