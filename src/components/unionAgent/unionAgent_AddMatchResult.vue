<template>
    <div>
        <h5 id="add-result-title"> Add Match Result : </h5>
        <b-overlay :show="loadingState" >
            <b-form @submit.prevent="onAddMatchResult" @reset.prevent="onReset" id="add-match-result-form">

                <!----------  Local Team Score  ---------->

                <b-form-group
                    id="input-group-local-team-score"
                    label-cols-sm="3"
                    label="Local Team Score:"
                    label-for="localTeamScore"
                    >
                    <b-form-input 
                        id="localTeamScore"
                        type="number"
                        min="0"
                        onkeypress="return event.charCode >= 48"
                        :placeholder="localPlaceHolder"
                        v-model="$v.form.localTeamScore.$model"
                        :state="validateState('localTeamScore')"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.localTeamScore.required">
                        Local Team '{{this.localTeamName}}' Score is required
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.form.localTeamScore.numeric">
                        Score Must Be Positive
                    </b-form-invalid-feedback>
                </b-form-group>

                <!----------  Visitor Team Score  ---------->

                <b-form-group
                    id="input-group-visitor-team-score"
                    label-cols-sm="3"
                    label="Visitor Team Score:"
                    label-for="visitorTeamScore"
                    >
                    <b-form-input 
                        id="visitorTeamScore"
                        type="number"
                        min="0"
                        onkeypress="return event.charCode >= 48"
                        :placeholder="visitorPlaceHolder"
                        v-model="$v.form.visitorTeamScore.$model"
                        :state="validateState('visitorTeamScore')"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.visitorTeamScore.required">
                        Visitor Team - '{{this.visitorTeamName}}' Score is required
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.form.visitorTeamScore.numeric">
                        Score Must Be Positive
                    </b-form-invalid-feedback>
                </b-form-group>

                <!----------  Reset Button  ---------->

                <b-button type="reset" variant="danger" >
                    Reset
                </b-button>

                <!----------  Submit Button  ---------->

                <b-button :disabled="this.$v.form.$invalid" type="submit" variant="primary" class="ml-5 w-25" >
                    Add Match Result
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

            <!----------  Loading  ---------->

            <template #overlay>
                <loading/>
            </template>

            <!----------  Cancel Button  ---------->

            <b-button variant="info" @click="$emit('cancel-add-match-result')" >
                Cancel Add Match Result
            </b-button>

        </b-overlay>
    </div>
</template>


<script>

import { required, numeric } from 'vuelidate/lib/validators';
import Loading from '../loading.vue';

export default {
    name: "AddMatchResult",

    components: {
        Loading
    },

    data(){
        return {
            form: {
                localTeamScore: "",
                visitorTeamScore: "",
                submitError: undefined
            },
            loadingState: false
        }
    },
    props: {
        matchID: {
            type: Number,
            require: true
        },
        localTeamName: {
            type: String,
            require: true
        },
        visitorTeamName: {
            type: String,
            require: true
        }
    },
    methods: {
        validateState(param) {
            const { $dirty, $error } = this.$v.form[param];
            return $dirty ? !$error : null;
        },
        async onAddMatchResult() {

            this.$v.form.$touch();

            if (this.$v.form.$anyError) {
                return;
            }
            await this.addMatchResult();
        },
        async addMatchResult(){
            try{
                this.loadingState = true;
                this.axios.defaults.withCredentials = true;

                const response = await this.axios.put(
                    this.$root.store.serverUrl + "unionAgent/addMatchResult",
                    {
                        matchID: this.matchID,
                        localTeamScore : Number.parseInt(this.form.localTeamScore),
                        visitorTeamScore: Number.parseInt(this.form.visitorTeamScore)
                    }
                );
                this.axios.defaults.withCredentials = false;
                
                if ( response.status == 200 ){
                    this.updateLocalStorage();
                    this.$root.toast("Add Match Result", "Match result added successfully", "success");
                }
                this.loadingState = false;
                
            } catch (err) {
                this.loadingState = false;
                this.form.submitError = err.response.data;
            }
        },
        onReset() {
            this.form = {
                localTeamScore: "",
                visitorTeamScore: "",
                submitError: undefined
            };
            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        updateLocalStorage(){

            var matches = JSON.parse(localStorage.getItem("leaguePastMatches"));

            matches.map((match) => {
                if (match.matchID == this.matchID){
                    match.localTeamScore = this.form.localTeamScore;
                    match.visitorTeamScore = this.form.visitorTeamScore;
                }
            });

            localStorage.setItem("leaguePastMatches", JSON.stringify(matches));

        },
        rebootError(){
            this.form.submitError = undefined;
        }
    },
    computed:{
        localPlaceHolder(){
            return "Please Enter '" + this.localTeamName + "' Score";
        },
        visitorPlaceHolder(){
            return "Please Enter '" + this.visitorTeamName + "' Score";
        }
    },
    validations: {
        form: {
            localTeamScore: {
                required,
                numeric
            },
            visitorTeamScore: {
                required,
                numeric
            }
        }
    }
}

</script>


<style>

#add-result-title {
    font-style: oblique;
    font-weight: bold;
    margin: 15px;
}

#add-match-result-form {
    width: 50%;
    margin: auto;
    text-align: center;
    padding: 40px;
}

label {
    font-weight: bold;
    text-decoration: underline;
}

</style>