<template>
    <div id="past-match-div">
        <div class="col-sm-4">
        <div class="match-card card text-white card-has-bg click-col">
            <div class="card-img-overlay d-flex flex-column">
            <div class="card-body">                         
                <h4 class="card-title mt-0" >

                    <div :title="this.matchID" class="match-title">
                        <a style="color: #000;">Match Id:{{ this.matchID }}</a>
                    </div>
                    <div class="future-match-content">                                           
                    <div class="row" >
                        <div class="teamsName">
                            <div class="left"><b-img  thumbnail fluid rounded="circle" :src="localTeamLogo" alt="Left image"/></div>
                            <div class="vs"> {{ this.localTeamName }} VS {{ this.visitorTeamName }}</div>
                            <div class="right"><b-img  thumbnail fluid rounded="circle" :src="visitorTeamLogo" alt="Right image"/></div>
                        </div><br><hr>
                    </div>
                    <div class=match-info>
                         Venue: {{ this.venueName }}
                    </div>
                    <div class=match-info v-if="Object.keys(this.refereeInformation).length">
                        Referee Full Name : {{ this.refereeFullName }}
                    </div>
                    <div class=match-info v-if="this.checkScore"> Match Score :
                            {{ this.localTeamScore }}  :  {{this.visitorTeamScore}}
                    </div>
                </div>
                </h4>
                    <small class="card-meta" style="float:right;">
                        match date: {{ this.matchDate.slice(0,10) }} , {{ this.matchDate.slice(11,16) }}
                    </small>
                </div>
                <div class="model-div">
                    <model-view v-if="this.eventsLog.length" :body="this.eventsLog" :buttonName="'show eventLog'"/>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>


<script>

import ModelView from "../model.vue";


export default {
    name: "PastMatchPreview",

    components: {
        ModelView,
    },

    data() {
        return {
            matchID: "",
            matchDate: "",
            localTeamName: "",
            visitorTeamName: "",
            venueName: "",
            refereeInformation: "",
            localTeamScore: "",
            visitorTeamScore: "",
            eventsLog: "",
            localTeamLogo : "",
            visitorTeamLogo : "",
        }
    },
    props: {
        match: {
            type: Object,
            require: true
        },
    },
    methods: {
        updateInformation() {

            this.matchID = this.match.matchID;
            this.matchDate = this.match.matchDate;
            this.localTeamName = this.match.localTeamName;
            this.visitorTeamName = this.match.visitorTeamName;
            this.venueName = this.match.venueName;
            this.refereeInformation = this.match.refereeInformation;
            this.localTeamScore = this.match.localTeamScore;
            this.visitorTeamScore = this.match.visitorTeamScore;
            this.eventsLog = this.match.eventsLog;
        }
    },
    computed: {
        refereeFullName() {
            if ( Object.keys(this.refereeInformation).length ) {
                return this.refereeInformation.firstname + " " + this.refereeInformation.lastname;
            }
            return "";
        },
        checkScore() {
            if ( this.localTeamScore==undefined || this.visitorTeamScore==undefined ){
                return false;
            }
            return true;
        }
    },
    mounted() {
        this.updateInformation();
        var teamInfo = JSON.parse(localStorage.getItem("teamsInfo"));
        teamInfo.map( (team) => {
        if ( team.teamName == this.match.localTeamName ) {
            this.localTeamLogo = team.teamLogo;
        }
        if ( team.teamName == this.match.visitorTeamName) {
                            console.log(this.match.visitorTeamName);

            this.visitorTeamLogo = team.teamLogo;
        }
    });
    },
}

</script>


<style lang="scss" scoped>

#past-match-div {
    padding-top: 15px;
    padding-bottom: 15px;
}

.right{
    position: relative;
    width:50px;
    height: 50px;
    top:-97px;
    right: -215px;
}
.left{
    position: relative;
    width:50px;
    height: 50px;
    top:-29px;
    left: 10px;
}
.vs{
    position: relative;
    top:-20px;
    left: 60px; 
}
.card {
    min-height: 190px !important;
    min-width: 330px !important;
    background-image:url('../../assets/AdobeStock_203017792.jpeg');
    font-size: 17px;
}

.my-row {
    background-color: #293241e0;
    border-radius: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.match-title {
    font-size: 25px!important;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    text-align: center;
    position: absolute;
    top:10px;
    left: 100px;
    margin: auto;
    color: rgb(32, 32, 32);
}

.teamsName {
    position: relative;
    top: 0px;
    // width: 200px;
    // word-wrap: break-word;
    font-size: 15px!important;
}

.match-info {
    position: relative;
    top: -10px;
    font-size: 12px!important;
    text-align: left;
    padding: 3px;
}
small {
    position: absolute;
    top: 150px;
}

h1 {
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 40px!important;
}

.Stage-title {
    min-width: 1140px;
    padding-top: 10px;
}

.page {
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 10px;
    min-height: 93.4vh;

}

.model-div {
    position:relative;
    top: -25px;
    left: 180px;
}

.like-div {
    position:relative;
    top: 0px;
    left: 13px;
}

    

</style>