<template>
    <div>
        <div id="table-div" v-show="showRefereeInfo">
            <b-table id="referee-table"
                hover
                bordered
                striped
                outlined
                no-border-collapse
                :items="informationList" >
            </b-table>
        </div>
        <div id="add-referee-div" v-show="!showRefereeInfo" >
            <h5 id="select-referee-title"> Select Referee : </h5>
            
            <b-overlay :show="loadingState" >

                <!----------  B-Table Referees  ---------->

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
                
                <!----------  Cancel Button  ---------->

                <b-button variant="danger" id="cancel-add-referee" @click="cancelBtn">
                    Cancel
                </b-button>

                <!----------  Add Button  ---------->

                <b-button :disabled="!this.form.refereeID" variant="primary" class="ml-5 w-25" @click="addReferee()" v-if="!updateOrAdd" >
                    Add Referee
                </b-button>

                <!----------  Update Button  ---------->

                <b-button :disabled="!this.form.refereeID" variant="primary" class="ml-5 w-25" @click="updateReferee()" v-else>
                    Update Referee
                </b-button>

                <!----------  Overlay Loading  ---------->

                <template #overlay>
                    <loading/>
                </template>
            </b-overlay>
        </div>
        <div id="update-referee-btn">
            <b-button variant="primary" size="md" @click="updateRefereeBtn()" v-show="showRefereeInfo">
                Update Referee
            </b-button>
        </div>
    </div>
</template>


<script>

import Loading from '../loading.vue';

export default {
    name: "RefereePreview",

    components: {
        Loading
    },

    data() {
        return {

            form: {
                refereeID: undefined,
                firstname: undefined,
                lastname: undefined,
                course: undefined
            },
            refereeFields: ['selected', "refereeID", "firstName", "lastName", "course"],
            updateRefereeState: false,
            loadingState: false
        }
    },

    props: {
        refereeInfo: {
            type: Object,
            require: true,
        },
        matchID: {
            type: Number,
            require: true
        },
        matchDate: {
            type: String,
            require: true
        }
    },
    methods: {
        onRowSelected(refereeRow) {
            this.form.refereeID = refereeRow[0]?.refereeID;
            this.form.firstname = refereeRow[0]?.firstName;
            this.form.lastname = refereeRow[0]?.lastName;
            this.form.course = refereeRow[0]?.course;

        },
        updateRefereeBtn(){
            this.updateRefereeState = !this.updateRefereeState;
        },
        cancelBtn(){
            if ( ! Object.keys(this.refereeInfo).length ){
                this.$emit('cancel-add-referee');
            }
            else {
                this.form = {
                    refereeID: undefined,
                    firstname: undefined,
                    lastname: undefined,
                    course: undefined
                };
                this.$refs.refereeTable.clearSelected();
                this.updateRefereeBtn();
            }
        },
        async addReferee(){
            try{
                this.loadingState = true;
                this.axios.defaults.withCredentials = true;

                const response = await this.axios.post(
                    this.$root.store.serverUrl + "unionAgent/addRefereeToMatch",
                    {
                        matchID: this.matchID,
                        refereeID : this.form.refereeID
                    }
                );
                this.axios.defaults.withCredentials = false;
                
                if ( response.status == 200 ){
                    this.updateLocalStorage();
                    this.$root.toast("Referee Add", "Referee Added successfully", "success");
                }
                this.loadingState = false;

            } catch (err) {
                console.log(err);
                this.form.submitError = err.response.data;
            }
        },
        async updateReferee(){
            try{
                this.loadingState = true;
                this.axios.defaults.withCredentials = true;

                const response = await this.axios.put(
                    this.$root.store.serverUrl + "unionAgent/addRefereeToMatch",
                    {
                        matchID: this.matchID,
                        refereeID : this.form.refereeID
                    }
                );
                this.axios.defaults.withCredentials = false;
                
                if ( response.status == 200 ){
                    this.updateLocalStorage();
                    this.$root.toast("Referee Update", "Referee Updated successfully", "success");
                }
                this.loadingState = false;
                
            } catch (err) {
                console.log(err);
                this.form.submitError = err.response.data;
            }
        },
        updateLocalStorage(){

            var matches = "";
            var pastOrFuture = "";
            if ( new Date() > new Date(this.matchDate) ){
                matches = JSON.parse(localStorage.getItem("leaguePastMatches"));
                pastOrFuture = "past";
            } else {
                matches = JSON.parse(localStorage.getItem("leagueFutureMatches"));
                pastOrFuture = "future";
            }

            matches.map((match) => {
                if (match.matchID == this.matchID){
                    match.refereeInformation = {
                        refereeID : this.form.refereeID,
                        firstname : this.form.firstname,
                        lastname : this.form.lastname,
                        course : this.form.course
                    }
                }
            });

            if ( pastOrFuture == "past" ){
                localStorage.setItem("leaguePastMatches", JSON.stringify(matches));
            } else {
                localStorage.setItem("leagueFutureMatches", JSON.stringify(matches));
            }
        }
    },
    computed:{
        informationList(){

            var infoList = [];

            if ( this.refereeInfo != {} ){
                infoList.push( {
                    refereeID : this.refereeInfo.refereeID,
                    firstName : this.refereeInfo.firstname,
                    lastName : this.refereeInfo.lastname,
                    course : this.refereeInfo.course
                });
            }
            return infoList;
        },
        referees() {

            var refereeLst = [];
            var refereesDic = JSON.parse(localStorage.getItem("referees"));

            if ( refereesDic ){ 

                refereesDic.map( ( referee ) => {

                    if ( JSON.stringify(referee) != JSON.stringify(this.refereeInfo) ){
                        refereeLst.push( {
                            refereeID : referee.refereeID,
                            firstName : referee.firstname,
                            lastName : referee.lastname,
                            course : referee.course
                        });
                    }
                });
            }
            return refereeLst;
        },
        showRefereeInfo(){
            if ( Object.keys(this.refereeInfo).length && !this.updateRefereeState ){
                return true;
            }
            return false;
        },
        updateOrAdd(){
            if ( Object.keys(this.refereeInfo).length ){
                return true;
            } else {
                return false;
            }
        }
    },
    mounted(){
        console.log("Referee Preview Mounted");
    }
}

</script>


<style scoped>

#loading-request {
    width: 20%;
    height: 20%;
}

#select-referee-title {
    font-style: oblique;
    text-decoration: underline;
    font-weight: bold;
}


</style>