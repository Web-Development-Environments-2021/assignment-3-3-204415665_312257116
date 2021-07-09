<template>
    <div>
        
    </div>
</template>


<script>

export default {
    name: "TeamFullDetailsByName",

    data() {
        return {

            teamName: "",
            teamLogo: "",
            teamSquad: [],
        }
    },

    mounted() {
        var teamInfo = JSON.parse(localStorage.getItem("teamsInfo"));
    }

}

</script>


<style>
    
</style>