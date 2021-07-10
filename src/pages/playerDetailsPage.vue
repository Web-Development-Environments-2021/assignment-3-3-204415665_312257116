<template>
    <div id="player-page">
        <b-container fluid class="bg-dark">
            <b-row>
                <div class="profile-pic">
                    <b-img thumbnail fluid :src="image" alt="Center image"></b-img>
                </div>
                    <h1 thumbnail fluid class="team-page-title" > {{name}} </h1>
                <div class="team-logo-pic">
                    <b-img thumbnail fluid :src="teamLogo" alt="Center image"></b-img>
                </div>
            </b-row>
            <b-row>
                <b-col id="my-player-row" class="p-5 ">
                    <b-table id="events-table"
                        table-variant="dark"
                        head-variant="dark"
                        responsive="sm"
                        hover
                        bordered
                        striped
                        outlined
                        stacked
                        caption-top
                        no-border-collapse
                        :items="playerDate"
                        >

                        <template #cell(team_name)="{ value : teamName }" >
                            <router-link :to="`/teams/teamDetails/${ teamName }`" class="teams-names" >
                                {{ teamName }}
                            </router-link>
                        </template>
                    </b-table>
                </b-col>
            </b-row>
        </b-container>
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
            teamLogo: "",
        }
    },

    methods: {
        extractPlayerInfo(player) {
            this.name = player.playerShortInfo.name;
            this.image= player.playerShortInfo.image;
            this.team_name= player.playerShortInfo.team_name;
            this.playerDate = [{

                position : player.playerShortInfo.position,
                team_name : player.playerShortInfo.team_name,
                commonName : player.commonName,
                nationality : player.nationality,
                birthDate : player.birthDate,
                birthCountry : player.birthCountry,
                height : player.height,
                weight : player.weight,
            }];
        }
    },

    mounted() {
    
        this.playerID = this.$route.params.playerID;

        var playersInfo = JSON.parse(localStorage.getItem("playersInfo"));
        var teamInfo = JSON.parse(localStorage.getItem("teamsInfo"));

        if ( playersInfo != undefined ){

            playersInfo.map(( player ) => {
                if ( player.playerShortInfo.playerID == this.playerID ) {
                    this.extractPlayerInfo(player);
                }
            })
            teamInfo.map( (team) => {
            if ( team.teamName == this.team_name ) {
                this.teamLogo = team.teamLogo;
            }
        });
        }
    }
}

</script>


<style>

#player-page {
    margin: auto;
    background-color: #353941;
    max-width: 100%;
    min-height: 93.1vmin;
    overflow: hidden;
}

.player-headline {
    margin-top: revert;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#my-player-con{
    border-radius:10px ;

}

h1 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 60px;
    color: blanchedalmond;
    padding: 40px;
}

.team-page-title {
    position: relative;
    margin-top: 10px;
    margin: auto;
}

.profile-pic{
    position: absolute;
    left: 35px;
    margin-top: 10px;
}

.team-logo-pic {
    position: absolute;
    right: 35px;
    margin-top: 10px;
}

.teams-names {
    color: white;
}

.teams-names:hover {
    color: blue;
}

</style>