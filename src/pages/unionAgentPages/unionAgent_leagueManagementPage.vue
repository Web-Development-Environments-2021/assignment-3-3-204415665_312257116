<template>
  <div>
    <h2 class="match-headline"> Future Matches </h2>
    <matches-table 
        :futureMatches="displayFutureMatches" 
        :pastMatches="displayPastMatches"
        :isBusy="isBusy">
    </matches-table>

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
    data(){
        return {

            futureMatches: [],
            pastMatches: [],
            updateInterval: undefined,

            addMatchDisabled: true,            

            displayFutureMatches: [],
            displayPastMatches: [],
            isBusy: true
        }
    },
    methods: {
        updateMatches(){
            if ( JSON.parse(localStorage.getItem("leaguePastMatches")) != null ) {

                if (  !( JSON.stringify( this.pastMatches) === JSON.stringify(JSON.parse(localStorage.getItem("leaguePastMatches"))))){

                    console.log("Updated Past");

                    this.isBusy = true;
                    this.pastMatches = [];
                    this.pastMatches.push(...JSON.parse(localStorage.getItem("leaguePastMatches")));
                    this.isBusy = false;

                    this.displayPastMatches = JSON.parse(JSON.stringify(this.pastMatches));

                }
                if ( ! (JSON.stringify(this.futureMatches) === JSON.stringify(JSON.parse(localStorage.getItem("leagueFutureMatches"))))){
                     
                    console.log("Updated Future");
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
        }
    },
    mounted(){
        
        this.updateInterval = setInterval( this.updateMatches, 100 );
        console.log("UA - League management page Mounted");

    },
    beforeDestroy(){

        clearInterval(this.updateMatches);
        console.log("UA - League management page Destroyed");

    },

}

</script>

<style>

.match-headline {
    margin-top: revert;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

#btn-add-new-match {
    margin: 10px;
    position: relative;
    left: 50%;
}

</style>