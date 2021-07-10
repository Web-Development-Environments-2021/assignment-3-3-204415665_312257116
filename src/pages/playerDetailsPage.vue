<template>
    <div>
            
    </div>
</template>


<script>

export default {
    name: "PlayerDetails",

    data(){
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

                }

            })
        }
    }

}

</script>


<style>
    
</style>