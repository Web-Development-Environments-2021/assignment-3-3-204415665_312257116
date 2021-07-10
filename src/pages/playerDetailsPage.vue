<template>
    <div id="player-page">
        <b-container fluid class="p-4 bg-dark">
            <b-row>
                <div class="profile-pic">
                    <b-img thumbnail fluid :src="image" alt="Center image"></b-img>
                </div>
                    <h1 thumbnail fluid class="team-page-title" > {{name}} </h1>
            </b-row>
            <hr>
            <b-row>
                <b-col id="my-player-row" class="p-5 ">
                    <b-table id="events-table"
                        table-variant="light"
                        head-variant="light"
                        responsive="sm"
                        hover
                        bordered
                        striped
                        outlined
                        no-border-collapse
                        :items="playerDate"
                        >
                    </b-table>
                    <!-- <ol>
                        <li> {{ playerID }} </li>
                        <li> {{ name }} </li>
                        <li> {{ playerID }} </li>
                        <li> {{ team_name }} </li>
                        <li> {{ commonName }} </li>
                        <li> {{ nationality }} </li>
                        <li> {{ birthDate }} </li>
                        <li> {{ birthCountry }} </li>
                        <li> {{ height }} </li>
                        <li> {{ weight }} </li>
                    </ol> -->
                </b-col>
            </b-row>


        </b-container>
        <!-- <h1 class="player-headline"> League Matches </h1> -->

    </div>
</template>


<script>

export default {
    name: "PlayerDetails",

    data() {
        return {

            playerDate: undefined,

            playerID: "",
            name: "",
            image: "",
            position: "",
            team_name: "",
            commonName: "",
            nationality: "",
            birthDate: "",
            birthCountry: "",
            height: "",
            weight: "",
            info:[
                {playerID: ""},
                {name: ""},
                {image: ""},
                {position: ""},
                {team_name: ""},
                {commonName: ""},
                {nationality: ""},
                {birthDate: ""},
                {birthCountry: ""},
                {height: ""},
                {weight: ""},
            ]
        
        }
    },

    methods: {
        extractPlayerInfo(player) {

            this.playerDate = [{
                name : player.playerShortInfo.name,
                image: player.playerShortInfo.image,
                position : player.playerShortInfo.position,
                team_name : player.playerShortInfo.team_name,
                commonName : player.commonName,
                nationality : player.nationality,
                birthDate : player.birthDate,
                birthCountry : player.birthCountry,
                height : player.height,
                weight : player.weight,
            }];

            // this.name = player.playerShortInfo.name;
            // this.image= player.playerShortInfo.image;
            // this.position = player.playerShortInfo.position;
            // this.team_name = player.playerShortInfo.team_name;
            // this.commonName = player.commonName;
            // this.nationality = player.nationality;
            // this.birthDate = player.birthDate;
            // this.birthCountry = player.birthCountry;
            // this.height = player.height;
            // this.weight = player.weight;

        }
    },

    mounted() {
    
        this.playerID = this.$route.params.playerID;

        var playersInfo = JSON.parse(localStorage.getItem("playersInfo"));

        if ( playersInfo != undefined ){

            playersInfo.map(( player ) => {
                if ( player.playerShortInfo.playerID == this.playerID ) {
                    this.extractPlayerInfo(player);
                }
            })
        }
    }
}

</script>


<style>

#player-page {
    margin: auto;
    background-color: #353941;
    /* border-radius: 10px; */
    max-width: 100%;
    min-height: 93.5vmin;
}

.player-headline {
    margin-top: revert;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: rgb(255, 238, 208);
    font-weight: bold;
    font-style: oblique;
    text-decoration: underline;
}


#my-player-row{
    background-color: #f5e8be;
    border-radius:10px ;

}
h1{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 60px;
    color: blanchedalmond;
    padding: 40px;
}
.profile-pic{
    padding-left: 40px;
}

</style>