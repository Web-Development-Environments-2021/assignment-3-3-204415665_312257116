<template>
  <div>
    <div>
        <h2 class="match-headline"> Future Matches </h2>
        <b-table
        class="future-matches-table"
        :items="futureMatches"
        :per-page="future_perPage"
        :current-page="future_currentPage"
        :busy="future_isBusy"
        small>
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
        </b-table>
        <b-pagination
        v-model="future_currentPage"
        :total-rows="future_rows"
        :per-page="future_perPage"
        aria-controls="future-matches-table"
        class="future-matches-pagination">
        </b-pagination>
    </div>
    <div>
        <h2 class="match-headline"> Past Matches </h2>
        <b-table
        class="past-matches-table"
        :items="pastMatches"
        :per-page="past_perPage"
        :current-page="past_currentPage"
        :busy="past_isBusy"
        small>
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
        </b-table>
        <b-pagination
        v-model="past_currentPage"
        :total-rows="past_rows"
        :per-page="past_perPage"
        aria-controls="past-matches-table"
        class="past-matches-pagination">
        </b-pagination>
    </div>
  </div>
</template>


<script>

export default {
    name: "leagueManagement",

    data(){
        return {
            pastMatches: [],
            futureMatches: [],

            future_perPage: 5,
            future_currentPage: 1,
            future_isBusy: true,

            past_perPage: 5,
            past_currentPage: 1,
            past_isBusy: true,

        }
    },

    // TODO: Extract referee + eventLog

    computed: {
        future_rows(){
            return this.futureMatches.length;
        },
        past_rows(){
            return this.pastMatches.length;
        }
    },
    mounted(){
        
        this.future_isBusy = true;
        this.past_isBusy = true;
        this.pastMatches.push(...this.$root.store.leaguePastMatches);
        this.futureMatches.push(...this.$root.store.leagueFutureMatches);
        console.log("League Management Mounted");
        this.future_isBusy=false;
        this.past_isBusy=false;

    }
}
</script>

<style>
.future-matches-table {
  margin: 50px;
  width: 90%;
}
.future-matches-pagination {
    margin-left: 50%; 
    margin-right: 50%;
}
.match-headline {
    margin-top: revert;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
.past-matches-table {
  margin: 50px;
  width: 90%;
}
.past-matches-pagination {
    margin-left: 50%; 
    margin-right: 50%;
}
</style>