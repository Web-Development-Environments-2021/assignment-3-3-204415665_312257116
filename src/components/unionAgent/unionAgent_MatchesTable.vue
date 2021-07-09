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
            bordered
            outlined
            no-border-collapse
            selectable
            select-mode=single
            ref="matchesTable"
            @row-selected="onRowSelected"
            head-variant="light"
            table-variant="light"
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

            <template #cell(localTeamName)="{ value : localTeamName }" >
               <router-link :to="`/teams/teamDetails/${ localTeamName }`" class="teams-names" >
                    {{ localTeamName }}
                </router-link>
            </template>

            <template #cell(visitorTeamName)="{ value : visitorTeamName }" >
               <router-link :to="`/teams/teamDetails/${ visitorTeamName }`" class="teams-names" >
                    {{ visitorTeamName }}
                </router-link>
            </template>

            <template #cell(matchScore)="row" >
                <b-row>
                    <b-col v-if="checkAddMatchResult(row)" >
                        <b>{{ row.item.localTeamScore }}</b> : <b>{{row.item.visitorTeamScore}}</b>
                    </b-col>
                    <b-col v-else >
                        <b-button variant="primary" size="sm"  @click="toggleRowDetails(row.item, 'matchResult')">
                            {{ row.item._matchResultShowing ? 'Cancel' : 'Add'}} Match Result
                        </b-button>
                    </b-col>
                </b-row>
            </template>

            <template #cell(refereeInformation)="{ item, value: refereeInformation }">
                <b-button v-if="Object.keys(refereeInformation).length" @click="toggleRowDetails(item, 'referee')" variant="info" size="sm">
                    {{ item._refereeShowing ? 'Hide' : 'Show'}} Details
                </b-button>
                <b-button v-else variant="primary" size="sm"  @click="toggleRowDetails(item, 'referee')"> 
                    {{ item._refereeShowing ? 'Cancel' : 'Add'}} Referee 
                </b-button>
            </template>

            <template #cell(eventsLog)="{ item}">
                <b-button v-if="checkEventLog(item)==1" @click="toggleRowDetails(item,'events')" variant="info" size="sm" >
                    {{ item._eventsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
                <b-button v-else-if="checkEventLog(item)==0" variant="primary" size="sm" @click="toggleRowDetails(item,'events')" > 
                    {{ item._eventsShowing ? 'Cancel' : 'Add'}} Event Log
                </b-button>
            </template>

            <template #cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                    <span aria-hidden="true">&check;</span>
                    <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">Not selected</span>
                </template>
            </template>

            <template #row-details="item">
                <b-card>
                    <referee-preview v-if="item.item._refereeShowing"
                        v-on:cancel-add-referee="toggleRowDetails(item.item, 'referee')"
                        :refereeInfo="item.item.refereeInformation"
                        :matchID="item.item.matchID"
                        :matchDate="item.item.matchDate">
                    </referee-preview>

                    <events-log-preview v-if="item.item._eventsShowing"
                        v-on:cancel-add-event="toggleRowDetails(item.item,'events')"
                        :matchID="item.item.matchID"
                        :eventsLog="item.item.eventsLog" >
                    </events-log-preview>

                    <add-match-result v-if="item.item._matchResultShowing"
                        v-on:cancel-add-match-result="toggleRowDetails(item.item, 'matchResult')"
                        :matchID="item.item.matchID"
                        :localTeamName="item.item.localTeamName"
                        :visitorTeamName="item.item.visitorTeamName" >
                    </add-match-result>
                </b-card>
            </template>

            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <loading/>
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
import AddMatchResult from './unionAgent_AddMatchResult.vue';
import Loading from '../loading.vue';

export default {
    name: "MatchesTable",

    components: {
        RefereePreview,
        EventsLogPreview,
        AddMatchResult,
        Loading,
    },
    data() {
        return{
            fields: [
                { key: 'selected'},
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
            require: true
        },
        isBusy: {
            type: Boolean,
            require: true
        },
        matchToDelete: {
            type: Number,
            require: true
        }
    },
    computed: {
        matches() {

            var mergedMatches = [];

            if (this.pastMatches.length != 0 ){

                this.pastMatches.map( ( pastMatch ) => {

                    mergedMatches.push( {                
                        matchID : pastMatch.matchID,
                        matchDate : pastMatch.matchDate,
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
        rows() {
            return this.futureMatches.length + this.pastMatches.length;
        }
    },
    methods: {
        toggleRowDetails(row, refereeOrEventsOrMatchResult) {

            // Not Showing Row
            if ( ! row._showDetails ){

                if ( refereeOrEventsOrMatchResult == 'referee' ){ // Open Referee

                    this.$set(row, '_refereeShowing', !row._refereeShowing);

                } else if ( refereeOrEventsOrMatchResult == 'events' ){ // Open Events

                    this.$set(row, '_eventsShowing', !row._eventsShowing);

                } else if ( refereeOrEventsOrMatchResult == 'matchResult' ){ // Open Events

                    this.$set(row, '_matchResultShowing', !row._matchResultShowing);
                } 
                this.$set(row, '_showDetails', !row._showDetails);

            } else{
               
                if ( refereeOrEventsOrMatchResult == 'referee' && !row._eventsShowing && !row._matchResultShowing ){ // Close Referee

                    this.$set(row, '_refereeShowing', !row._refereeShowing);
                    this.$set(row, '_showDetails', !row._showDetails);

                } 
                else if( refereeOrEventsOrMatchResult == 'events' && !row._refereeShowing && !row._matchResultShowing ){ // Close Events

                    this.$set(row, '_eventsShowing', !row._eventsShowing);
                    this.$set(row, '_showDetails', !row._showDetails);

                }
                else if( refereeOrEventsOrMatchResult == 'matchResult' && !row._refereeShowing && !row._eventsShowing ){ // Close MatchResult

                    this.$set(row, '_matchResultShowing', !row._matchResultShowing);
                    this.$set(row, '_showDetails', !row._showDetails);

                }
                else if ( refereeOrEventsOrMatchResult == 'events' && row._refereeShowing && !row._matchResultShowing ){ // Change From Referee To Events

                    this.$set(row, '_refereeShowing', !row._refereeShowing);
                    this.$set(row, '_eventsShowing', !row._eventsShowing);

                }
                else if ( refereeOrEventsOrMatchResult == 'matchResult' && row._refereeShowing && !row._matchResultShowing ){ // Change From Referee To MatchResult

                    this.$set(row, '_refereeShowing', !row._refereeShowing);
                    this.$set(row, '_matchResultShowing', !row._matchResultShowing);

                }
                else if ( refereeOrEventsOrMatchResult == 'referee' && row._eventsShowing && !row._matchResultShowing ){ // Change From Events To Referee

                    this.$set(row, '_refereeShowing', !row._refereeShowing);
                    this.$set(row, '_eventsShowing', !row._eventsShowing);

                }
                else if ( refereeOrEventsOrMatchResult == 'matchResult' && row._eventsShowing && !row._refereeShowing ){ // Change From Events To MatchResult

                    this.$set(row, '_matchResultShowing', !row._matchResultShowing);
                    this.$set(row, '_eventsShowing', !row._eventsShowing);

                }
                else if ( refereeOrEventsOrMatchResult == 'referee' && row._matchResultShowing && !row._eventsShowing){ // Change From MatchResult To Referee

                    this.$set(row, '_matchResultShowing', !row._matchResultShowing);
                    this.$set(row, '_refereeShowing', !row._refereeShowing);

                }
                else if ( refereeOrEventsOrMatchResult == 'events' && row._matchResultShowing && !row._refereeShowing ){ // Change From MatchResult To Events

                    this.$set(row, '_matchResultShowing', !row._matchResultShowing);
                    this.$set(row, '_eventsShowing', !row._eventsShowing);

                }
            }
        },
        checkAddMatchResult(row) {

            if ( row.item.localTeamScore==null && row.item.visitorTeamScore==null ){

                if( Date.parse(row.item.matchDate) < Date.parse(new Date()) ){
                    return false;   
                }
            }
            return true;
        },
        checkEventLog(row){
            if ( row?.eventsLog == undefined ){
                return undefined
            }
            else if ( row.eventsLog.length == 0 ){
                return 0
            }
            else if ( row.eventsLog.length >0  ){
                return 1
            }
        },
        onRowSelected(matchRow) {
            this.$emit('update-match-delete',matchRow[0]?.matchID);
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
    margin-left: 45%; 
    margin-right: 45%;
}

.btn-info,  .btn-primary {
    width: 70%;
}

.teams-names {
    color: black;
}

.teams-names:hover {
    color: blue;
}

</style>