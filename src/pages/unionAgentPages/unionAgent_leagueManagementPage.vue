<template>
  <div>
    <h1 class="match-headline"> League Matches </h1>
    <matches-table
        v-on:update-match-delete="updateMatchDelete"
        :futureMatches="displayFutureMatches" 
        :pastMatches="displayPastMatches"
        :isBusy="isBusy">
    </matches-table>

    <b-button :disabled="!deleteMatchID" @click="deleteMatch()" variant="danger" size="lg" id="delete-match-btn" >
        Delete Match
    </b-button>

    <b-button :disabled="addMatchDisabled" @click="moveToAddMatch()"  variant="primary" size="lg" id="btn-add-new-match">
        Add New Match
    </b-button>

  </div>
</template>


<script>

import MatchesTable from '../../components/unionAgent/unionAgent_MatchesTable.vue';

export default {
    name: "LeagueManagement",

    components: {
        MatchesTable,
    },
    data() {
        return {

            futureMatches: [],
            pastMatches: [],
            updateInterval: undefined,

            addMatchDisabled: true,            

            displayFutureMatches: [],
            displayPastMatches: [],
            isBusy: true,
            deleteMatchID: undefined
        }
    },
    methods: {
        updateMatches(){
            if ( JSON.parse(localStorage.getItem("leaguePastMatches")) != null  ) {

                if (  !( JSON.stringify( this.pastMatches) === JSON.stringify(JSON.parse(localStorage.getItem("leaguePastMatches"))))){

                    this.isBusy = true;
                    this.pastMatches = [];
                    this.pastMatches.push(...JSON.parse(localStorage.getItem("leaguePastMatches")));
                    this.isBusy = false;

                    this.displayPastMatches = JSON.parse(JSON.stringify(this.pastMatches));

                }
                if ( ! (JSON.stringify(this.futureMatches) === JSON.stringify(JSON.parse(localStorage.getItem("leagueFutureMatches"))))){
                     
                    this.isBusy = true;
                    this.futureMatches = [];
                    this.futureMatches.push(...JSON.parse(localStorage.getItem("leagueFutureMatches")));
                    this.isBusy = false;

                    this.displayFutureMatches = JSON.parse(JSON.stringify(this.futureMatches));
                }
            }
            this.updateAddMatchButton();
          
        },
        moveToAddMatch() {
            this.$router.push("/unionAgent/match");
        },
        updateAddMatchButton() {

            if ( JSON.parse(localStorage.getItem("unionAgentDataActions")) != null ){
                this.addMatchDisabled = false;
            } else {
                this.addMatchDisabled = true;
            }
        },
        updateMatchDelete(matchID){
            this.deleteMatchID = matchID;
        },
        async deleteMatch(){
            try{
                this.isBusy = true;
                this.axios.defaults.withCredentials = true;

                const response = await this.axios.delete(
                    this.$root.store.serverUrl + "unionAgent/match",
                    {
                        params: { 
                            matchID: this.deleteMatchID
                        }
                    }
                );
                this.axios.defaults.withCredentials = false;
                
                if ( response.status == 200 ){
                    this.updateStorageAfterDelete();
                    this.$root.toast("Match Delete", "Match deleted successfully", "success");
                }
                this.isBusy = false;
                
            } catch (err) {
                // this.form.submitError = err.response.data;
            }    
        },
        updateStorageAfterDelete(){

            var foundMatch = false;
        
            var matches = JSON.parse(localStorage.getItem("leaguePastMatches"));

            var resultFromRemove = this.removeMatchFromLS(matches);

            foundMatch = resultFromRemove.foundMatch;

            if ( ! foundMatch){
            
                var matches = JSON.parse(localStorage.getItem("leagueFutureMatches"));
                resultFromRemove = this.removeMatchFromLS(matches);
                matches = resultFromRemove.matches;
                localStorage.setItem("leagueFutureMatches", JSON.stringify(matches));

            } else {

                matches = resultFromRemove.matches;
                localStorage.setItem("leaguePastMatches", JSON.stringify(matches));

            }
        },
        removeMatchFromLS(matches){
            var foundMatch = false;
            var index, idx = 0;
            matches.map((match) => {
                if ( match.matchID == this.deleteMatchID ){
                    foundMatch = true;
                    index = idx;
                }
                idx++;
            });
            if ( index > -1 ) {
                matches.splice(index, 1);
            }
            return { foundMatch : foundMatch, matches : matches };
        }
    },
    mounted() {
        this.updateInterval = setInterval( this.updateMatches, 100 );
    },
    beforeDestroy(){
        clearInterval(this.updateInterval);
    }
}

</script>

<style>

.match-headline {
    margin-top: revert;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: rgb(255, 238, 208);
    font-weight: bold;
    font-style: oblique;
    text-decoration: underline;
}

#btn-add-new-match ,#delete-match-btn {
    margin: 10px;
    position: relative;
    left: 40%;
}

</style>