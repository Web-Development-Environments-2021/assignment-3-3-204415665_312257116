<template>
    <div>
        <b-table class="matches-table"
            :fields="fields"
            :items="matches"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :per-page="perPage"
            :current-page="currentPage"
            :busy="isBusy"
            hover
            fixed
            bordered
            outlined
            head-variant="light"
            sort-icon-left
            >
            <template #head(matchScore) > 
                <b-row colspan="2">
                    <b-col>  Score    </b-col>
                </b-row>
                <b-row colspan="2">
                    <b-col>  Local : Visitor    </b-col>
                </b-row>                   
            </template>

            <template #cell(matchScore)="row" >
                <b-row>
                    <b-col v-if="!checkAddMatchResult(row)" >
                        <b>{{ row.item.localTeamScore }}</b> : <b>{{row.item.visitorTeamScore}}</b>
                    </b-col>
                    <b-col v-else >
                        <b-button variant="primary" size="sm" >
                            Add Match Result
                        </b-button>
                    </b-col>
                </b-row>
            </template>

            <template #cell(refereeInformation)="{ item, value: refereeInformation }">
                <b-button v-if="Object.keys(refereeInformation).length" @click="toggleRowDetails(item, 'referee')" variant="info" size="sm">
                    {{ item._refereeShowing ? 'Hide' : 'Show'}} Details
                </b-button>
                <b-button v-else variant="primary" size="sm" > 
                    Add Referee
                </b-button>
            </template>

            <template #cell(eventsLog)="{ item, value: eventsLog }">
                <b-button v-if="eventsLog.length" @click="toggleRowDetails(item,'events')" variant="info" size="sm" >
                    {{ item._eventsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
                <b-button v-else variant="primary" size="sm"> 
                    Add Event Log
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
                { key : "matchScore" },
                { key : "refereeInformation" },
                { key : "eventsLog" }
            ],
            perPage: 5,
            currentPage: 1,
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
        },
        isBusy: {
            type: Boolean,
            require: true
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
        },
        checkAddMatchResult(row){

            if ( !row.item.localTeamScore && ! row.item.visitorTeamScore ){

                if( Date.parse(row.item.matchDate) < Date.parse(new Date()) ){
                    return true;   
                }
            }
            return false;
        }
    }

}

</script>


<style scoped >

.matches-table {
  margin: 50px;
  width: 95%;
  text-align: center;
  align-items: center;
}

.matches-pagination {
    margin-left: 50%; 
    margin-right: 50%;
}

.btn-info,  .btn-primary {
    width: 70%;
}

</style>