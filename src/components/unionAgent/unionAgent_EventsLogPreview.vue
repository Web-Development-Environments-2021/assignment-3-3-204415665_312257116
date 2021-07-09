<template>
    <div>
        <b-overlay :show="loadingState" >

            <div id="events-log" v-show="showEventsLogState" >
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

                    <b-button variant="primary" size="md" id="add-event-btn" @click="addEventBtn()">
                        Add New Event
                    </b-button>
            </div>

            <!----------  Add Event Div  ---------->

            <div id="add-event-div" v-show="!showEventsLogState">
                <h5 id="events-log-title"> Add New Event : </h5>
                <b-form @submit.prevent="onAddEvent" @reset.prevent="onReset" id="add-match-result-form">

                    <!----------  Minute In Match  ---------->

                    <b-form-group
                        id="input-group-minute-in-match"
                        label-cols-sm="3"
                        label="Minute In Match :"
                        label-for="minuteInMatch"
                        >
                        <b-form-input 
                            id="minuteInMatch"
                            type="number"
                            min="0"
                            max="120"
                            onkeypress="return event.charCode >= 48"
                            placeholder="-- Please Enter Minute In Match --"
                            v-model="$v.form.minuteInMatch.$model"
                            :state="validateState('minuteInMatch')"
                            >
                        </b-form-input>
                        <b-form-invalid-feedback v-if="!$v.form.minuteInMatch.required">
                            Minute in match is required
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-if="!$v.form.minuteInMatch.numeric">
                            Minute Must Be Positive
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-if="!$v.form.minuteInMatch.between">
                            Minute need to be between 0-120
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!----------  Event Type  ---------->

                    <b-form-group
                        id="input-group-event-type"
                        label-cols-sm="3"
                        label="Event Type :"
                        label-for="eventType"
                        >
                        <b-form-select 
                            id="eventType"
                            v-model="$v.form.eventType.$model"
                            :options="eventTypes"
                            :state="validateState('eventType')"
                        >
                            <template #first>
                                <b-form-select-option value="" disabled>-- Please Select Event Type --</b-form-select-option>
                            </template>
                        </b-form-select>
                        <b-form-invalid-feedback v-if="!$v.form.eventType.required">
                            Event Type is required
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!----------  Event Description  ---------->

                    <b-form-group
                        id="input-group-event-type"
                        label-cols-sm="3"
                        label="Event Description :"
                        label-for="eventDescription"
                        >
                        <b-form-input id="eventDescription" placeholder="-- Enter Event Description"/>
                    </b-form-group>

                    <!----------  Reset Button  ---------->

                    <b-button type="reset" variant="danger" >
                        Reset
                    </b-button>

                    <!----------  Submit Button  ---------->

                    <b-button :disabled="this.$v.form.$invalid" type="submit" variant="primary" class="ml-5 w-25" >
                        Add Event
                    </b-button>
                </b-form>

                <!----------  Submit Error Alert  ---------->

                <b-alert
                    class="mt-2"
                    v-if="form.submitError"
                    variant="warning"
                    dismissible
                    @dismissed="rebootError"
                    show >
                    Add New Match Failed: {{ form.submitError }}
                </b-alert>

                <!----------  Cancel Button  ---------->

                <b-button variant="info" id="cancel-add-event" @click="cancelBtn()" >
                    Cancel Add Event
                </b-button>
            </div>

            <!----------  Overlay Loading  ---------->

            <template #overlay>
                <loading/>
            </template>
        </b-overlay>
    </div>
</template>


<script>
import { required, numeric, between } from 'vuelidate/lib/validators';
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
            loadingState: false,
            addEventState: false,
            form: {
                minuteInMatch: "",
                eventType: "",
                eventDescription: "",
                submitError: undefined
            },
            eventTypes: ['Goal', 'Red card', 'Yellow card', 'Injury', 'Subsitute']
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
                this.loadingState = false;
                this.form.submitError = err.response.data;
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
        },
        addEventBtn(){
            this.addEventState = !this.addEventState;
        },
        async onAddEvent(){
            this.$v.form.$touch();

            if (this.$v.form.$anyError) {
                return;
            }
            await this.addEvent();
        },
        async addEvent(){
            try{
                this.loadingState = true;
                this.axios.defaults.withCredentials = true;

                const response = await this.axios.post(
                    this.$root.store.serverUrl + "unionAgent/addMatchEventsLog",
                    {
                        matchID: this.matchID,
                        eventsLog: [{
                            minuteInMatch: Number.parseInt(this.form.minuteInMatch),
                            eventType: this.form.eventType,
                            eventDescription: this.form.eventDescription
                        }]
                    }
                );
                
                if ( response.status == 200 ){
                    this.$root.store.initDataForUnionAgent().then(() => {
                        this.$root.toast("Add Event", "Event added successfully", "success");
                        this.axios.defaults.withCredentials = false;
                        this.loadingState = false;
                    });
                }
                
            } catch (err) {
                this.loadingState = false;
                this.form.submitError = err.response.data;
            }   
        },
        onReset() {
            this.form = {
                minuteInMatch: "",
                eventType: "",
                eventDescription: "",
                submitError: undefined
            };
            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        validateState(param) {
            const { $dirty, $error } = this.$v.form[param];
            return $dirty ? !$error : null;
        },
        cancelBtn(){
            if ( ! this.eventsLog?.length ){
                this.$emit('cancel-add-event');
            }
            else {
                this.onReset();
                this.addEventBtn();
            }
        },
        rebootError(){
            this.form.submitError = undefined;
        }
    },
    computed: {
        showEventsLogState() {
            if ( this.eventsLog?.length && !this.addEventState ){
                return true;
            }
            return false;
        },
    },
    validations: {
        form: {
            minuteInMatch:{
                required,
                numeric,
                between: between(0,120)
            },
            eventType: {
                required
            }
        }
    },
}

</script>


<style>

#events-log-title {
    font-style: oblique;
    text-decoration: underline;
    font-weight: bold;
    margin: 15px;
}

#delete-event-btn, #add-event-btn {
    margin: 10px;
}

</style>