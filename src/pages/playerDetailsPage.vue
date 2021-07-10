<template>
    <div id="player-page">
        <h1 class="player-headline"> League Matches </h1>
        <ol>
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
        </ol>
    </div>
</template>


<script>

export default {
    name: "PlayerDetails",

    data() {
        return {

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
            weight: ""
        }
    },

    methods: {
        extractPlayerInfo(player){

            this.name = player.playerShortInfo.name;
            this.image= player.playerShortInfo.image;
            this.position = player.playerShortInfo.position;
            this.team_name = player.playerShortInfo.team_name;
            this.commonName = player.commonName;
            this.nationality = player.nationality;
            this.birthDate = player.birthDate;
            this.birthCountry = player.birthCountry;
            this.height = player.height;
            this.weight = player.weight;

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
    background-color: #293241e0;
    border-radius: 10px;
    max-width: 98%;
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


</style>