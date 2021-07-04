<template>
    <div class="container">
        <h1 class="title"> Add New Match </h1>
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
                label="Local Team Name:"
                label-for="localTeamName"
                >
                <b-form-select 
                    id="localTeamName"
                    v-model="$v.form.localTeamName.$model"
                    :options="teamsNames"
                    :state="validateState('localTeamName')"
                >
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
                label="Visitor Team Name:"
                label-for="visitorTeamName"
                >
                <b-form-select 
                    id="visitorTeamName"
                    v-model="$v.form.visitorTeamName.$model"
                    :options="teamsNames"
                    :state="validateState('visitorTeamName')"
                >
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
                label="venue Name:"
                label-for="venueName"
                >
                <b-form-select 
                    id="venueName"
                    v-model="$v.form.venueName.$model"
                    :options="venuesNames"
                    :state="validateState('venueName')"
                >
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

        <!----------  Alert Submit Error TODO: What Is This ??  ---------->
        
        <b-alert
            class="mt-2"
            v-if="form.submitError"
            variant="warning"
            dismissible
            show >
            Register failed: {{ form.submitError }}
        </b-alert>

        <div id="return-btn-div" >
            <b-button @click="moveToLeaguePage" variant="primary" size="md" id="btn-back-league-page" >
                Return League Management Page
            </b-button>
        </div>
        
    </div>
</template>


<script>

// TODO: Need Catch Err + Check Better Validation + Need To Thing What To Do Next TODO: //

import { required, not, sameAs } from "vuelidate/lib/validators";

export default {
    name: "Match",

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
        }
    },
    methods: {
        validateState(param) {
            const { $dirty, $error } = this.$v.form[param];
            return $dirty ? !$error : null;
        },
        async onAddMatch() {
            this.$v.form.$touch();
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
                var formattedDate = this.formatDateTime(this.form.matchDate);
                this.axios.defaults.withCredentials = true;

                const response = await this.axios.post(
                    this.$root.store.serverUrl + "unionAgent/match",
                    {
                        matchInformation: {
                            matchDate : formattedDate,
                            localTeamName : this.form.localTeamName,
                            visitorTeamName : this.form.visitorTeamName,
                            venueName : this.form.venueName
                        },
                        refereeID : this.form?.refereeID
                    }
                );
                this.axios.defaults.withCredentials = false;

                console.log(response.data);

                window.alert("What now ?"); 
                
            } catch (err) {
                console.log(err);
                this.form.submitError = err.response.data.message;
            }
        },
        formatDateTime(date) {
            var formattedDateTime = date.slice(0, 19).replace('T', ' ');
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

            if ( new Date( this.form.matchDate ) < new Date() ){ // Past Match

                dateMatch = "matchDateAndTime";

            } else {
                dateMatch = "matchDate";
            }

            var pastMatches = JSON.parse(localStorage.getItem("leaguePastMatches"));

            var badDetails = false;
            var message = "";

            pastMatches.map( ( match ) => {
                if ( match.matchDateAndTime == dateFormatted && match.venueName == this.form.venueName && 
                    match.localTeamName == this.form.localTeamName && match.visitorTeamName == this.form.visitorTeamName ){

                    badDetails = true;
                    message = "Match all ready exist";
                } 
                else if ( match.matchDateAndTime == dateFormatted && match.venueName == this.form.venueName ) {

                    badDetails = true;
                    message = "Venue not available";
                }
                else if ( match.matchDateAndTime == dateFormatted && match.localTeamName == this.form.localTeamName ) {

                    badDetails = true;
                    message = "Local team not available";
                }
                else if ( match.matchDateAndTime == dateFormatted && match.visitorTeamName == this.form.visitorTeamName ) {

                    badDetails = true;
                    message = "Visitor team not available";
                }

                return { badDetails : badDetails, message: message };

            })

            

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