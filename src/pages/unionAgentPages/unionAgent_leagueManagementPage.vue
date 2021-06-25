<template>
  <div>
    <div>
        <h2 class="match-headline"> Future Matches </h2>
        <b-table class="future-matches-table"
            :items="futureMatches"
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
                <b-card >
                    <b-table 
                        :items="[row.item.refereeInformation]"
                        >
                    </b-table>
                </b-card>
<!--             <b-card>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Referee ID:</b></b-col>
                        <b-col>{{ row.item.refereeInformation.refereeID }}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
                        <b-col>{{ row.item.refereeInformation.refereeID }}</b-col>
                    </b-row>
                </b-card> -->
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
            :items="pastMatches"
            :per-page="past_perPage"
            :current-page="past_currentPage"
            :busy="past_isBusy"
            small
            :fields="fieldsPast">
            <!-- <template #cell(refereeInformation)="rowReferee">
                <b-button size="sm" @click="rowReferee.toggleDetails" class="mr-2">
                {{ rowReferee.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>

            <template #row-details="rowReferee">
                <b-card >
                    <b-table 
                        :items="[rowReferee.item.refereeInformation]"
                        >
                    </b-table>
                </b-card>
            </template> -->
            <template #cell(eventsLog)="rowEventsLog">
                <b-button size="sm" @click="rowEventsLog.toggleDetails" class="mr-2">
                {{ rowEventsLog.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>

            <template #row-details="rowEventsLog">
                <b-card >
                    <b-table 
                        :items="rowEventsLog.item.eventsLog"
                        >
                    </b-table>
                </b-card>
            </template>
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

export default {
    name: "LeagueManagement",

    data(){
        return {
            pastMatches: [],
            futureMatches: [],

            pastMatchesDisplay: [],
            futureMatchesDisplay: [],

            fieldsPast: ["matchID", "matchDate", "localTeamName", "visitorTeamName", "refereeInformation", "eventsLog"],
            fieldsFuture: ["matchID", "matchDate", "localTeamName", "visitorTeamName", "refereeInformation"], // TODO: Get Keys

            future_perPage: 5,
            future_currentPage: 1,
            future_isBusy: true,

            past_perPage: 5,
            past_currentPage: 1,
            past_isBusy: true,

        }
    },

    methods: {
        updateMatches(){
            this.pastMatches.push(...JSON.parse(localStorage.getItem("leaguePastMatches")));
            this.futureMatches.push(...JSON.parse(localStorage.getItem("leagueFutureMatches")));

            this.future_isBusy = false;
            this.past_isBusy = false;

        },
        async getMatchesOnLogin(){
            await this.$root.store.initDataForUnionAgent();
            this.updateMatches();
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
        extractEventsLogs(matches){

            var matches_Copy = JSON.parse(JSON.stringify(matches));

            matches_Copy.map( ( match ) => {
                if ( match.eventsLog.length != 0 ){

                    match = match.eventsLog.map( (eventLog) => {
                        match.eventsLog.eventID = eventLog.eventID;
                    })

                    var eventsLog = match.eventsLog;

                    match.refereeID = eventsLog.refereeID;
                    match.firstname = eventsLog.firstname;
                    match.lastname = eventsLog.lastname;
                    match.course = eventsLog.course;

                }
                delete match.eventsLog;

                if (futureOrPast == "future") {
                    this.futureMatchesDisplay.push(match);
                } else {
                    this.pastMatchesDisplay.push(match);
                }
            })
        }

    },

    // TODO: Extract eventLog

    computed: {
        future_rows(){
            return this.futureMatches.length;
        },
        past_rows(){
            return this.pastMatches.length;
        }
    },
    mounted(){
        this.future_isBusy = true;
        this.past_isBusy = true;

        if ( JSON.parse(localStorage.getItem("leaguePastMatches")) != null ) {
            
            this.updateMatches();

        } else {
            this.getMatchesOnLogin();
        }

        this.extractRefereesInformation(this.futureMatches, "future");
        this.extractRefereesInformation(this.pastMatches, "past");

        console.log("UA - League management page Mounted");
    }
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