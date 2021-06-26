<template>
  <div>
    <div>
        <h2 class="match-headline"> Future Matches </h2>
        <b-table class="future-matches-table"
            :items="displayFutureMatches"
            :per-page="future_perPage"
            :current-page="future_currentPage"
            :busy="future_isBusy"
            small
            :fields="fieldsFuture">
            <template #cell(refereeInformation)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>
            <template #row-details="row">
                    <referee-preview :refereeInfo="row.item.refereeInformation"></referee-preview>
            </template>
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
        </b-table>
        <b-pagination class="future-matches-pagination"
            v-model="future_currentPage"
            :total-rows="future_rows"
            :per-page="future_perPage"
            aria-controls="future-matches-table">
        </b-pagination>
    </div>
    <div>
        <h2 class="match-headline"> Past Matches </h2>
        <b-table class="past-matches-table"
            :items="displayPastMatches"
            :per-page="past_perPage"
            :current-page="past_currentPage"
            :busy="past_isBusy"
            small
            :fields="fieldsPast">

            <!-- <template #cell(refereeInformation)="refereeRow">
                <b-button size="sm" @click="toggleRowDetails(refereeRow,'refereeInformation')" class="mr-2">
                {{ refereeRow.item.refereeInformation._showDetails ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>
            <template #cell(eventsLog)="rowEventsLog">
                <b-button size="sm" @click="toggleRowDetails(rowEventsLog,'eventsLog')" class="mr-2">
                {{ rowEventsLog.item.eventsLog._showDetails ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>

            <template v-if="refereeRow.item.refereeInformation._showDetails" #row-details="refereeRow" >
                <b-card >
                    <b-table 
                        :items="[refereeRow.item.refereeInformation]"
                        >
                    </b-table>
                </b-card>
            </template>
            <template v-else-if="refereeRow.item.eventsLog._showDetails" #row-details="rowEventsLog">
                <b-card >
                    <b-table 
                        :items="rowEventsLog.item.eventsLog">
                    </b-table>
                </b-card>
            </template> -->

            <template #cell(refereeInformation)="{ item, value }">
                <b-button size="sm" @click="toggleRowDetails(item, value, 'referee')" class="mr-2">
                {{ value.showDetails ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>
            <template #cell(eventsLog)="{ item, value }">
                <b-button size="sm" @click="toggleRowDetails(item, value,'event')" class="mr-2">
                {{ value.showDetails ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>

            <template #row-details="item">
                <b-card v-if="item.item.refereeInformation.showDetails">
                    <b-table 
                        :items="[item.item.refereeInformation]">
                    </b-table>
                </b-card>
                <b-card v-else-if="item.item.eventsLog.showDetails">
                    <b-table 
                        :items="item.item.eventsLog">
                    </b-table>
                </b-card>
            </template>


            <!-- <template #row-details="rowEventsLog">
                <b-card >
                    <b-table 
                        :items="rowEventsLog.item.eventsLog"
                        >
                    </b-table>
                </b-card>
            </template> -->
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
        </b-table>
        <b-pagination class="past-matches-pagination"
            v-model="past_currentPage"
            :total-rows="past_rows"
            :per-page="past_perPage"
            aria-controls="past-matches-table">
        </b-pagination>
    </div>
  </div>
</template>


<script>

import RefereePreview from "../../components/unionAgent/unionAgent_RefereePreview.vue";

export default {
    name: "LeagueManagement",

    components: {
        RefereePreview
    },

    data(){
        
        return {

            futureMatches: [],
            pastMatches: [],
            updateInterval: undefined,

            displayFutureMatches: [],
            displayPastMatches: [],

            fieldsFuture: ["matchID", "matchDate", "localTeamName", "visitorTeamName", "refereeInformation"], // TODO: Get Keys
            fieldsPast: ["matchID", "matchDate", "localTeamName", "visitorTeamName", "refereeInformation", "eventsLog"],

            future_perPage: 5,
            future_currentPage: 1,
            future_isBusy: true,
            future_rows: undefined,

            past_perPage: 5,
            past_currentPage: 1,
            past_isBusy: true,
            past_rows: undefined,
            
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
        extractRefereesInformation(matches, futureOrPast){

            var matches_Copy = JSON.parse(JSON.stringify(matches));

            matches_Copy.map( ( match ) => {
                if ( match.refereeInformation.length != 0 ){

                    var refereeInformation = match.refereeInformation;

                    match.refereeID = refereeInformation.refereeID;
                    match.firstname = refereeInformation.firstname;
                    match.lastname = refereeInformation.lastname;
                    match.course = refereeInformation.course;

                }
                delete match.refereeInformation;

                if (futureOrPast == "future") {
                    this.futureMatchesDisplay.push(match);
                } else {
                    this.pastMatchesDisplay.push(match);
                }
            })
        },
        toggleRowDetails(item, value, refereeOrEvent) {
        this.$set(value, 'showDetails', !value.showDetails);
        this.$set(item, '_showDetails', !item._showDetails);
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