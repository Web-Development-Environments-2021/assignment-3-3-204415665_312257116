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
                    v-model="$v.form.matchDate.$model"
                    type="text"
                    :state="validateState('matchDate')"
                    >
                </b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.matchDate.required">
                    Match Date is required
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

            <!-- <b-form-group
                id="input-group-referee-id"
                label-cols-sm="3"
                label="Referee :"
                label-for="refereeID"
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
            </b-form-group> -->

        </b-form>
        
    </div>
</template>


<script>

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
                refereeID: "",
                submitError: undefined
            },
            errors: [],
            validated: false
        }
    },
    methods: {
        validateState(param) {
            const { $dirty, $error } = this.$v.form[param];
            return $dirty ? !$error : null;
        },
        onAddMatch() {
            // console.log("register method called");
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }
            // console.log("register method go");
            this.Register();
        },
        onReset() {
            this.form = {

                matchDate: "",
                localTeamName: "",
                visitorTeamName: "",
                venueName: "",
                refereeID: "",

            };
            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        async addNewMatch(){
            console.log("Let's Go ");
        }
    },
    computed: {
        teamsNames(){
            return JSON.parse(localStorage.getItem("teamsNames"));
        },
        venuesNames(){
            return JSON.parse(localStorage.getItem("venuesNames"));
        },
        referees(){
            return JSON.parse(localStorage.getItem("referees"));
        }
    },
    validations: {
        form: {
            matchDate: {
                required
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


<style>

.container {
    max-width: 500px;
}

.title {
    text-align: center;
}

</style>