<template>
    <div>
        <b-table class="matches-table"
            :items="matches"
            :per-page="perPage"
            :current-page="currentPage"
            :busy="isBusy"
            small
            hover
            fixed
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            sort-icon-left
            :fields="fields">

            <!-- TODO: localTeam score -->

            <template #cell(refereeInformation)="{ item }">
                <b-button size="sm" @click="toggleRowDetails(item, 'referee')" class="mr-2">
                {{ item._refereeShowing ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>
            <template #cell(eventsLog)="{ item }">
                <b-button size="sm" @click="toggleRowDetails(item,'events')" class="mr-2">
                {{ item._eventsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>

            <template #row-details="item">
                <b-card>
                    <referee-preview v-if="item.item._refereeShowing"
                        :refereeInfo="item.item.refereeInformation" >
                    </referee-preview>
                    <events-log-preview v-if="item.item._eventsShowing"
                        :eventsLog="item.item.eventsLog" >
                    </events-log-preview>
                </b-card>
            </template>
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
        </b-table>
        <b-pagination class="matches-pagination"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="matches-table">
        </b-pagination>
    </div>
</template>


<script>


import RefereePreview from './unionAgent_RefereePreview.vue';
import EventsLogPreview from './unionAgent_EventsLogPreview.vue';

export default {
    name: "MatchesTable",

    components:{
        RefereePreview,
        EventsLogPreview,
    },

    data(){
        return{

            fields: [
                { key : "matchID", sortable: true },
                { key : "matchDate", sortable: true },
                { key : "localTeamName", sortable: true },
                { key : "visitorTeamName", sortable: true },
                { key : "venueName" },
                { key : "localTeamScore" },
                { key : "visitorTeamScore" },
                { key : "refereeInformation" },
                { key : "eventsLog" }
            ],
            perPage: 5,
            currentPage: 1,
            isBusy: false,
            sortBy: "matchDate",
            sortDesc: false,
        }
    },
    props: {

        futureMatches: {
            type: Array,
            require: true
        },
        pastMatches: {
            type: Array,
            require: false
        }
    },
    computed: {
        matches(){

            var mergedMatches = [];

            if (this.pastMatches.length != 0 ){

                this.pastMatches.map( ( pastMatch ) => {

                    mergedMatches.push( {                
                        matchID : pastMatch.matchID,
                        matchDate : pastMatch.matchDateAndTime,
                        localTeamName : pastMatch.localTeamName,
                        visitorTeamName : pastMatch.visitorTeamName,
                        venueName : pastMatch.venueName,
                        localTeamScore : pastMatch.localTeamScore,
                        visitorTeamScore : pastMatch.visitorTeamScore,
                        refereeInformation : pastMatch.refereeInformation,
                        eventsLog : pastMatch.eventsLog 
                    }             
                )});

            }
            if ( this.futureMatches.length != 0 ){

                this.futureMatches.map( (futureMatch) => { 
                
                    mergedMatches.push({
                        matchID : futureMatch.matchID,
                        matchDate : futureMatch.matchDate,
                        localTeamName : futureMatch.localTeamName,
                        visitorTeamName : futureMatch.visitorTeamName,
                        venueName : futureMatch.venueName,
                        localTeamScore : undefined,
                        visitorTeamScore : undefined,
                        refereeInformation : futureMatch.refereeInformation,
                        eventsLog : undefined
                    }
                )});
            }

            return mergedMatches;

        },
        rows(){
            return this.futureMatches.length + this.pastMatches.length;
        }
    },
    methods:{
        toggleRowDetails(row, refereeOrEvents) {

            // Not Showing Row
            if ( ! row._showDetails ){

                if ( refereeOrEvents == 'referee' ){ // Open Referee

                    this.$set(row, '_refereeShowing', !row._refereeShowing);

                } else if ( refereeOrEvents == 'events' ){ // Open Events

                    this.$set(row, '_eventsShowing', !row._eventsShowing);
                }
                this.$set(row, '_showDetails', !row._showDetails);

            } else{
               
                if ( refereeOrEvents == 'referee' && !row._eventsShowing ){ // Close Referee

                    this.$set(row, '_refereeShowing', !row._refereeShowing);
                    this.$set(row, '_showDetails', !row._showDetails);

                } 
                else if( refereeOrEvents == 'events' && !row._refereeShowing ){ // Close Events

                    this.$set(row, '_eventsShowing', !row._eventsShowing);
                    this.$set(row, '_showDetails', !row._showDetails);

                }
                else if ( refereeOrEvents == 'events' && row._refereeShowing ){ // Change From Referee To Events

                    this.$set(row, '_refereeShowing', !row._refereeShowing);
                    this.$set(row, '_eventsShowing', !row._eventsShowing);

                }
                else if ( refereeOrEvents == 'referee' && row._eventsShowing ){ // Change From Events To Referee
                    this.$set(row, '_refereeShowing', !row._refereeShowing);
                    this.$set(row, '_eventsShowing', !row._eventsShowing);
                }
            }
        }
    }

}

</script>


<style>

.matches-table {
  margin: 50px;
  width: 90%;
}
.matches-pagination {
    margin-left: 50%; 
    margin-right: 50%;
}

</style>