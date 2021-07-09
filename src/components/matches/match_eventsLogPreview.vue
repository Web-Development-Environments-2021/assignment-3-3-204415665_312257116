<template>
    <div>
        <h5 id="events-log-title"> Events Log : </h5>
            <b-table id="events-table"
                table-variant="light"
                head-variant="light"
                responsive="sm"
                hover
                bordered
                striped
                outlined
                no-border-collapse
                :items="eventsLog"
                >
            </b-table>

            <!----------  Pagination  ---------->

            <b-pagination class="events-pagination" v-if="rows > 4"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="events-table">
            </b-pagination>
    </div>
</template>


<script>

export default {
    name: "EventsLogPreview",

    data() {
        return {
            currentPage: 1,
            perPage: 4,
        }
    },

    props: {
        eventsLog: {
            type: Array,
            require: true
        },
    },
    computed: {
        rows(){
            return this.eventsLog.length;
        }
    }
}

</script>


<style>

#events-log-title {
    font-style: oblique;
    text-decoration: underline;
    font-weight: bold;
    margin: 15px;
}

</style>