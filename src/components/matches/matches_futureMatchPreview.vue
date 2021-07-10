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
                        {{ this.localTeamName }} VS {{ this.visitorTeamName }}
                    </div><br><hr>
                    </div>
                    <div class=match-info>
                        Venue: {{ this.venueName }}
                    </div>
                    <div class=match-info v-if="Object.keys(this.refereeInformation).length">
                        Referee Full Name : {{ this.refereeFullName }}
                    </div>
                </div>
                </h4>
                <small class="card-meta" style="float:right;">match date: {{this.matchDate.slice(0,10)}} , {{ this.matchDate.slice(11,16)}}</small>
            </div>
            <div class="like-div">
                <b-button v-if="this.myToggleCheck" style="float:right;" @click="handleClick()" :pressed="this.myToggle" variant="outline-warning"> ⭐ </b-button>
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
            return "";
        },
    },
    mounted() {
        this.updateInterval = setInterval( this.updateInformation, 100 );
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

.card {
    min-height: 140px !important;
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
    top: 100px;
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

</style>