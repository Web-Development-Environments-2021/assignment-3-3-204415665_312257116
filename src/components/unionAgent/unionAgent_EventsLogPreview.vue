<template>
    <div>
        <h5 id="events-log-title"> Events Log : </h5>
        <b-overlay :show="loadingState" >
            <b-table id="events-table"
                table-variant="light"
                head-variant="light"
                responsive="sm"
                hover
                bordered
                striped
                outlined
                no-border-collapse
                selectable
                select-mode=single
                ref="eventsTable"
                @row-selected="onRowSelected"
                :items="eventsLog"
                :fields="eventsFields"
                >
                <template #cell(selected)="{ rowSelected }">
                    <template v-if="rowSelected">
                        <span aria-hidden="true">&check;</span>
                        <span class="sr-only">Selected</span>
                    </template>
                    <template v-else>
                        <span aria-hidden="true">&nbsp;</span>
                        <span class="sr-only">Not selected</span>
                    </template>
                </template>
            </b-table>

            <!----------  Delete Button  ---------->

            <b-button :disabled="!this.eventID" variant="danger" id="delete-event-btn" @click="deleteEvent()">
                Delete Event
            </b-button>

            <!----------  Add New Events Button  ---------->

            <b-button variant="primary" size="md" id="add-event-btn">
                Add New Event
            </b-button>

            <!----------  Overlay Loading  ---------->

            <template #overlay>
                <loading/>
            </template>
        </b-overlay>
    </div>
</template>


<script>

import Loading from '../loading.vue';

export default {
    name: "EventsLogPreview",

    components: {
        Loading
    },

    data(){
        return{
            eventsFields: ['selected', "eventID", "eventTimeAndDate", "minuteInMatch", "eventType", "eventDescription"],
            eventID: undefined,
            eventToDelete: undefined,
            loadingState: false
        }
    },
    props: {
        eventsLog: {
            type: Array,
            require: true
        },
        matchID: {
            type: Number,
            require: true
        }
    },
    methods: {
        onRowSelected(eventRow) {
            this.eventID = eventRow[0]?.eventID;
            this.eventToDelete = eventRow[0];
        },
        async deleteEvent(){
            try{
                this.loadingState = true;
                this.axios.defaults.withCredentials = true;

                const response = await this.axios.delete(
                    this.$root.store.serverUrl + "unionAgent/addMatchEventsLog",
                    {
                        params: { 
                            matchID: this.matchID,
                            eventID : this.eventID
                        }
                    }
                );
                this.axios.defaults.withCredentials = false;
                
                if ( response.status == 200 ){
                    this.updateStorageAfterDelete();
                    this.$root.toast("Event Delete", "Event deleted successfully", "success");
                }
                this.loadingState = false;
                
            } catch (err) {
                // this.form.submitError = err.response.data;
            }     
        },
        updateStorageAfterDelete(){

            var matches = JSON.parse(localStorage.getItem("leaguePastMatches"));

            matches.map((match) => {
                if (match.matchID == this.matchID) {
                    var index, idx=0;
                    match.eventsLog.map((event) => {
                        if (event.eventID == this.eventID){
                            index=idx;
                        }
                        idx++
                    });
                    if (index > -1) {
                        match.eventsLog.splice(index, 1);
                    }
                }
            });
            localStorage.setItem("leaguePastMatches", JSON.stringify(matches));
        }
    },
    mounted(){
        console.log("Events Log Mounted");
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

#delete-event-btn, #add-event-btn{
    margin: 10px;
}

</style>