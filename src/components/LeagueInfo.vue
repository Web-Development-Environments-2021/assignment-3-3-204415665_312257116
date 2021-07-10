<template>
    <div class="league-preview">
        <div class="match-card league-card  text-white">
        <div class="card-img-overlay d-flex flex-column">
        <div class="card-body" >                         
        <h4 class="card-title mt-0">
            <div>
                <b-card-title id="league-name">
                    {{ leagueName }}
                </b-card-title>
                <b-card-text >
                    <span>
                        <a id="row-title">  Season</a>
                        <a id="row-ans"> :  {{ season }} </a> 
                    </span>
                </b-card-text>
                <b-card-text>
                    <span>
                        <a id="row-title">  Stage</a> :
                        <a id="row-ans" v-if="stage==null"> {{stageText}} </a>
                        <a id="a-massage" v-if="stage!=null" > <br/> {{stageText}} </a>
                    </span>
                </b-card-text>
            </div>
            <br/>
            <a id="row-title">  Next Match</a> :
            <future-match-preview 
                v-if="hasNextMatch"
                :match="nextMatch"
                >
            </future-match-preview>
            <a id="a-massage" v-if="!hasNextMatch" > <br/>There isn't next match at this time </a>
        </h4>
        </div>
        </div>
        </div>
  </div>
</template>


<script>

import FutureMatchPreview from './matches/matches_futureMatchPreview.vue';

export default {

    name: "LeagueInfo",

    components: {
        FutureMatchPreview,
    },
  
    data() {
        return {

            leagueName : "", 
            season : "", 
            stage : "",
            nextMatch : undefined,

            gotLeagueDetails : false,
            start_time : undefined,
            updateInterval : undefined,
        }
    },
    methods: {
        extractLeagueDetails() {

            var time_elapsed = 100;
            var timeNow;

            var leagueDetails = JSON.parse(localStorage.getItem("leagueDetails"));
            var teamInfo = JSON.parse(localStorage.getItem("teamsInfo"));

            if (teamInfo==undefined) {
                return;
            }

            if ( leagueDetails != null ) {
                
                this.gotLeagueDetails = true;
                this.leagueName = leagueDetails.league_name;
                this.season = leagueDetails.current_season_name;
                this.stage = leagueDetails.current_stage_name;
                this.nextMatch = leagueDetails.first_next_match;
            } else {
                timeNow = new Date();
                time_elapsed = 10-(timeNow - this.start_time) / 1000;
            }

            if ( ! this.gotLeagueDetails ||  time_elapsed <= 0 ) {
                this.stopInterval();
            }

        },
        stopInterval() {
            clearInterval(this.updateInterval);
            this.updateInterval = undefined;
        }
    },
    computed: {
        stageText() {
            if ( this.stage == "null" ){
                return "There is no current stage at this time";
            }
            return this.stage;
        },
        hasNextMatch() {
            if ( this.nextMatch == undefined || Object.keys(this.nextMatch).length == 0 ){
                return false;
            }
            return true;
        },
    },
    mounted() {
        this.start_time = new Date();
        this.updateInterval = setInterval( this.extractLeagueDetails, 100 );
    },
    beforeDestroy(){
        if ( this.updateInterval != undefined ) {
            clearInterval(this.updateInterval);
        }
    }
}

</script>


<style>

.match-card.league-card {
    min-height: 95vh !important;
    width: 420px;
    border-radius: 0px;
    font-size: 17px;
    background: #293241e0;
    left:-1150px;
}

.league-preview {
    display: inline-block;
    width: 420px;
    position: absolute;
    margin: 10px 10px;
    /* border-style: solid; */
    /* border-radius: 10px; */
    border-width: 5px;
    

}

.league-preview .league-title {
    text-align: center;
    text-transform: uppercase;
    color:  rgb(111, 155, 197);
    font-size: 100px;
    left:-1150px;

}

.league-preview .league-content {
    width: 100%;
    overflow: hidden;
}

#league-name {
    text-align: center;
    font-weight: bold;
    /* font-style: oblique; */
    /* text-decoration: underline; */
    font-size: 45px;
    color:  rgb(129, 170, 209);
}

#row-title {
    text-decoration: underline;
}

#a-massage {
    font-size: 20px;
}

</style>