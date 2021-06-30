<template>
  <div>
    <div>
        <h2 class="match-headline"> Future Matches </h2>
        <matches-table 
            :futureMatches="displayFutureMatches" 
            :pastMatches="displayPastMatches">
        </matches-table>
    </div>
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

            displayFutureMatches: [],
            displayPastMatches: [],
        }
    },

    methods: {
        updateMatches(){

            if ( JSON.parse(localStorage.getItem("leaguePastMatches")) != null ) {

                if (  !( JSON.stringify( this.pastMatches) === JSON.stringify(JSON.parse(localStorage.getItem("leaguePastMatches"))))){

                    console.log("Updated Past");

                    this.past_isBusy = true;
                    this.pastMatches = [];
                    this.pastMatches.push(...JSON.parse(localStorage.getItem("leaguePastMatches")));
                    // this.extractRefereesInformation(this.pastMatches, "past");
                    this.past_isBusy = false;

                    this.displayPastMatches = JSON.parse(JSON.stringify(this.pastMatches));
                    this.past_rows = this.pastMatches.length;

                }
                if ( ! (JSON.stringify(this.futureMatches) === JSON.stringify(JSON.parse(localStorage.getItem("leagueFutureMatches"))))){
                     
                    console.log("Updated Future");
                    this.future_isBusy = true;
                    this.futureMatches = [];
                    this.futureMatches.push(...JSON.parse(localStorage.getItem("leagueFutureMatches")));
                    // this.extractRefereesInformation(this.futureMatches, "future");
                    this.future_isBusy = false;

                    this.displayFutureMatches = JSON.parse(JSON.stringify(this.futureMatches));
                    this.future_rows = this.futureMatches.length;

                }
            }
          
        },
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
.future-matches-table {
  margin: 50px;
  width: 90%;
}
.future-matches-pagination {
    margin-left: 50%; 
    margin-right: 50%;
}
.match-headline {
    margin-top: revert;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
.past-matches-table {
  margin: 50px;
  width: 90%;
}
.past-matches-pagination {
    margin-left: 50%; 
    margin-right: 50%;
}
</style>