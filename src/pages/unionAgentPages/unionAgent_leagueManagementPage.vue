<template>
    <div>
        <FutureMatchPreview></FutureMatchPreview>
        <PastMatchPreview></PastMatchPreview>
    </div>
</template>


<script>

import FutureMatchPreview from "../../components/matches/matches_futureMatchPreview"
import PastMatchPreview from "../../components/matches/matches_pastMatchPreview"

export default {
    name: "leagueManagement",

    components: {
        FutureMatchPreview,
        PastMatchPreview
    },

    data(){
        return {
            pastMatches: [],
            futureMatches: [],
        }
    },

    // mounted(){

    // }


}
</script>


<style>
    
</style>