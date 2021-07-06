<template>
    <div class="container">
        <h1 class="title"> Add New Match </h1>
        <b-overlay :show="loadingState">
            <b-form @submit.prevent="onAddMatch" @reset.prevent="onReset">

                <!----------  Match Date  ---------->

                <b-form-group
                    id="input-group-match-date"
                    label-cols-sm="3"
                    label="Match Date:"
                    label-for="matchDate"
                    >
                    <b-form-input 
                        id="matchDate"
                        type="datetime-local"
                        v-model="$v.form.matchDate.$model"
                        :state="validateState('matchDate')"
                        >
                    </b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.matchDate.required">
                        Match Date is required
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.form.matchDate.checkMatchYear">
                        League year is: 2021-2022
                    </b-form-invalid-feedback>
                </b-form-group>

                <!----------  Local Team Name  ---------->

                <b-form-group
                    id="input-group-local-team-name"
                    label-cols-sm="3"
                    label="Local Team :"
                    label-for="localTeamName"
                    >
                    <b-form-select 
                        id="localTeamName"
                        v-model="$v.form.localTeamName.$model"
                        :options="teamsNames"
                        :state="validateState('localTeamName')"
                    >
                        <template #first>
                            <b-form-select-option value="" disabled>-- Please Select Local Team --</b-form-select-option>
                        </template>
                    </b-form-select>
                    <b-form-invalid-feedback v-if="!$v.form.localTeamName.required">
                        Local Team is required
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.form.localTeamName.sameAsVisitorTeam">
                        Local team can't be the same as visitor team
                    </b-form-invalid-feedback>
                </b-form-group>

                <!----------  Visitor Team Name  ---------->

                <b-form-group
                    id="input-group-visitor-team-name"
                    label-cols-sm="3"
                    label="Visitor Team :"
                    label-for="visitorTeamName"
                    >
                    <b-form-select 
                        id="visitorTeamName"
                        v-model="$v.form.visitorTeamName.$model"
                        :options="teamsNames"
                        :state="validateState('visitorTeamName')"
                    >
                        <template #first>
                            <b-form-select-option value="" disabled>-- Please Select Visitor Team --</b-form-select-option>
                        </template>
                    </b-form-select>
                    <b-form-invalid-feedback v-if="!$v.form.visitorTeamName.required">
                        Visitor team is required
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.form.visitorTeamName.sameAsLocalTeam">
                        Visitor team can't be the same as local team
                    </b-form-invalid-feedback>
                </b-form-group>

                <!----------  Venue Name  ---------->

                <b-form-group
                    id="input-group-venue-name"
                    label-cols-sm="3"
                    label="venue :"
                    label-for="venueName"
                    >
                    <b-form-select 
                        id="venueName"
                        v-model="$v.form.venueName.$model"
                        :options="venuesNames"
                        :state="validateState('venueName')"
                    >
                        <template #first>
                            <b-form-select-option value="" disabled>-- Please Select Venue --</b-form-select-option>
                        </template>
                    </b-form-select>
                    <b-form-invalid-feedback v-if="!$v.form.venueName.required">
                        Venue is required
                    </b-form-invalid-feedback>
                </b-form-group>

                <!----------  Referee ID  ---------->

                <b-form-group
                    id="input-group-referee-id"
                    label-cols-sm="3"
                    label="Referee :"
                    label-for="refereeID"
                    >
                    <b-table id="referees-table"
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
                        ref="refereeTable"
                        @row-selected="onRowSelected"
                        :items="referees"
                        :fields="refereeFields"
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
                </b-form-group>
                
                <!----------  Reset Button  ---------->

                <b-button type="reset" variant="danger" id="reset-add-match">
                    Reset
                </b-button>

                <!----------  Submit Button  ---------->

                <b-button :disabled="this.$v.form.$invalid" type="submit" variant="primary" class="ml-5 w-25" >
                    Add Match
                </b-button>
            </b-form>

            <b-alert
                class="mt-2"
                v-if="form.submitError"
                variant="warning"
                dismissible
                @dismissed="rebootError"
                show >
                Add New Match Failed: {{ form.submitError }}
            </b-alert>

            <div id="return-btn-div" >
                <b-button @click="moveToLeaguePage" variant="primary" size="md" id="btn-back-league-page" >
                    Return League Management Page
                </b-button>
            </div>

            <template #overlay>
                <loading/>
            </template>

        </b-overlay>
    </div>
</template>


<script>

import { required, not, sameAs } from "vuelidate/lib/validators";
import Loading from '../../components/loading.vue';

export default {
    name: "Match",
    components: {
        Loading
    },
    data() {
        return {

            form: {
                matchDate: "",
                localTeamName: "",
                visitorTeamName: "",
                venueName: "",
                refereeID: undefined,
                submitError: undefined
            },
            refereeFields: ['selected', "refereeID", "firstName", "lastName", "course"],
            loadingState: false
        }
    },
    methods: {
        validateState(param) {
            const { $dirty, $error } = this.$v.form[param];
            return $dirty ? !$error : null;
        },
        async onAddMatch() {
            this.$v.form.$touch();

            var finalCheck = this.finalValidation();

            if ( finalCheck.badDetails ){
                this.form.submitError = finalCheck.message;
                return;
            }

            if (this.$v.form.$anyError) {
                return;
            }
            await this.addNewMatch();
        },
        onReset() {
            this.form = {

                matchDate: "",
                localTeamName: "",
                visitorTeamName: "",
                venueName: "",
                refereeID: undefined,

            };
            this.$refs.refereeTable.clearSelected();
            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        async addNewMatch() {
            try{
                this.loadingState = true;
                var formattedDate = this.formatDateTime(this.form.matchDate);
                var matchInformation = {
                    matchDate : formattedDate,
                    localTeamName : this.form.localTeamName,
                    visitorTeamName : this.form.visitorTeamName,
                    venueName : this.form.venueName
                };
                var refereeID = this.form?.refereeID;

                this.axios.defaults.withCredentials = true;

                const response = await this.axios.post(
                    this.$root.store.serverUrl + "unionAgent/match",
                    {
                        matchInformation: matchInformation,
                        refereeID : refereeID
                    }
                );

                if ( response.status == 201 ){
                    this.$root.store.initDataForUnionAgent().then();
                    this.$root.toast("Add New Match", "Match Added successfully", "success");
                }

                this.axios.defaults.withCredentials = false;
                this.loadingState = false;
                this.onReset();
                
            } catch (err) {
                console.log(err);
                this.form.submitError = err.response.data;
            }
        },
        formatDateTime(date) {
            var formattedDateTime = date.slice(0, 19).replace('T', ' ');
            formattedDateTime += ":00";
            return formattedDateTime;
        },
        onRowSelected(refereeRow) {
            this.form.refereeID = refereeRow[0]?.refereeID;
        },
        moveToLeaguePage(){
            this.$router.push("/unionAgent/leagueManagement");
        },
        finalValidation(){
            
            var dateFormatted = this.formatDateTime(this.form.matchDate);

            var dateMatch = "";
            var matches = [];

            var badDetails = false;
            var message = "";

            if ( new Date( this.form.matchDate ) < new Date() ){ // Past Match

                dateMatch = "matchDateAndTime";
                matches = JSON.parse(localStorage.getItem("leaguePastMatches"));
            } else {
                dateMatch = "matchDate";
                matches = JSON.parse(localStorage.getItem("leagueFutureMatches"));
            }

            matches.map( ( match ) => {
                if ( match[dateMatch] == dateFormatted && match.venueName == this.form.venueName && 
                    match.localTeamName == this.form.localTeamName && match.visitorTeamName == this.form.visitorTeamName ){
                    
                    badDetails = true;
                    message = "Match all ready exist";
                } 
                else if ( match[dateMatch] == dateFormatted && match.venueName == this.form.venueName ) {

                    badDetails = true;
                    message = "Venue not available";
                }
                else if ( match[dateMatch] == dateFormatted && match.localTeamName == this.form.localTeamName ) {

                    badDetails = true;
                    message = "Local team not available";
                }
                else if ( match[dateMatch] == dateFormatted && match.visitorTeamName == this.form.visitorTeamName ) {

                    badDetails = true;
                    message = "Visitor team not available";
                }
            })
            return { badDetails : badDetails, message: message };
        },
        rebootError(){
            this.form.submitError = undefined;
        }
    },
    computed: {
        teamsNames() {
            return JSON.parse(localStorage.getItem("teamsNames"));
        },
        venuesNames() {
            return JSON.parse(localStorage.getItem("venuesNames"));
        },
        referees() {

            var refereeLst = [];
            var refereesDic = JSON.parse(localStorage.getItem("referees"));

            if ( refereesDic ){ 

                refereesDic.map( ( referee ) => {
                    refereeLst.push( {
                    refereeID : referee.refereeID,
                    firstName : referee.firstname,
                    lastName : referee.lastname,
                    course : referee.course
                    });
                })
            }
            return refereeLst;
        }
    },
    validations: {
        form: {
            matchDate: {
                required,
                checkMatchYear: (date) => {
                    var year = date.slice(0,4);
                    if ( year != "2021" && year != "2022" ){
                        return false;
                    }
                    return true;
                }
            },
            localTeamName: {
                required,
                sameAsVisitorTeam: not(sameAs("visitorTeamName"))
            },
            visitorTeamName: {
                required,
                sameAsLocalTeam: not(sameAs("localTeamName"))
            },
            venueName: {
                required
            }
        }
    },
    mounted() {
        console.log("Add New Match Page Mounted ");
    }
}
</script>


<style scoped>

.container {
    max-width: 55%;
    background: rgba(168, 236, 137, 0.76);
}

.title {
    text-align: center;
    font-style: oblique;
    font-weight: bolder;
    padding: 10px;
}

form {
    margin: auto;
    width: 100%;
    text-align: center;
    font-weight: bold;
}

#return-btn-div {
    padding: 20px;
    text-align: center;
}

</style>