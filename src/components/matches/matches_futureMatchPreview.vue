<template>
    <div id="future-match-div">
        <div class="col-sm-4">
        <div class="match-card card text-white card-has-bg click-col">
            <div class="card-img-overlay d-flex flex-column">
            <div class="card-body">                         
                <h4 class="card-title mt-0" >
                    <div :title="this.matchID" class="match-title">
                        <a style="color: #000;">
                            Match Id:{{ this.matchID }}
                        </a>
                    </div>
                    <div class="future-match-content">                                           
                    <div class="row" >     
                    <div class="teamsName">

                        <div class="left"><b-img  thumbnail fluid rounded="circle" :src="localTeamLogo" alt="Left image"/></div>
                        <div class="vs"> 
                            <router-link :to="`/teams/teamDetails/${ this.localTeamName }`" class="teams-names" >
                                {{ this.localTeamName }}
                            </router-link>
                            VS
                            <router-link :to="`/teams/teamDetails/${ this.visitorTeamName }`" class="teams-names" >
                                {{ this.visitorTeamName }}
                            </router-link>
                        </div>
                        <div class="right"><b-img  thumbnail fluid rounded="circle" :src="visitorTeamLogo" alt="Right image"/></div>
                    
                    </div><br><hr>
                    </div>
                    <div class=match-info>
                        Venue: {{ this.venueName }}
                    </div>
                    <div class=match-info >
                        Referee Name : {{ this.refereeFullName }}
                    </div>
                </div>
                </h4>
                <small class="card-meta" style="float:right;">match date: {{this.matchDate.slice(0,10)}} , {{ this.matchDate.slice(11,16)}}</small>
            </div>
            <div class="like-div">
                <b-button pill class="bg-outline-warning"  v-if="this.myToggleCheck" style="float:right;" @click="handleClick()" :pressed="this.myToggle" variant="outline-warning"><b-icon icon="star-fill" class="rounded-circle" /></b-button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>


<script>

export default {

    name: "FutureMatchPreview",

    data() {
        return {
            matchID: "",
            matchDate: "",
            localTeamName: "",
            visitorTeamName: "",
            venueName: "",
            refereeInformation: "",
            myToggle: undefined,
            localTeamLogo : "",
            visitorTeamLogo : "",
            updateInterval: undefined,
            checkMatchInfo: {},
        }
    },
    props: {
        match: {
            type: Object,
            require: true
        },
    },
    methods: {
        handleClick(){
            this.$emit('click-handler', this.match);
        },
        updateInformation(){

            if ( ! ( JSON.stringify(this.match) === this.checkMatchInfo ) ){

                this.matchID = this.match.matchID;
                this.matchDate = this.match.matchDate;
                this.localTeamName = this.match.localTeamName;
                this.visitorTeamName = this.match.visitorTeamName;
                this.venueName = this.match.venueName;
                this.refereeInformation = this.match.refereeInformation;
                this.myToggle = this.match?.myToggle;
                this.checkMatchInfo = JSON.stringify(this.match);
            }
        }
    },
    computed: {
        myToggleCheck() {
            return this.match?.myToggle!=undefined;
        },
        refereeFullName() {
            if ( Object.keys(this.refereeInformation).length ) {
                return this.refereeInformation.firstname + " " + this.refereeInformation.lastname;
            }
            return "  -  ";
        },
    },
    mounted() {
        this.updateInterval = setInterval( this.updateInformation, 100 );
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
    beforeDestroy(){
        clearInterval(this.updateInterval);
    }
}

</script>

<style lang="scss" scoped>

#future-match-div {
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
    color: rgb(212, 181, 0);
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
    top: -70px;
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
    top: 10px;
    left: 170px;
}

.like-div {
    position:relative;
    top: 10px;
    left: 13px;
}

.teams-names {
    color: white;
}

.teams-names:hover {
    color: blue;
}

</style>