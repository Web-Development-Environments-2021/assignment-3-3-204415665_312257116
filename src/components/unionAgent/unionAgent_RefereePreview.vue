<template>
    <div>
        <b-card >
            <b-table 
                :items="informationList" >
            </b-table>
        </b-card>
    </div>
</template>


<script>

export default {
    name: "RefereePreview",

    data(){
        return {
            informationList: [],
            refereeId: undefined,
            firstName: undefined,
            lastName: undefined,
            course: undefined,
        }
    },
    props: {
        refereeInfo: {
            type: Object,
            require: true,
        }
    },
    mounted(){

        if ( this.refereeInfo.length != 0 ){
            this.refereeId = this.refereeInfo.refereeID;
            this.firstName = this.refereeInfo.firstname;
            this.lastName = this.refereeInfo.lastname;
            this.course = this.refereeInfo.course;

            this.informationList.push( { ID: this.refereeId, FistName: this.firstName, LastName: this.lastName, Course: this.course } );
        }
    }
}

</script>


<style>
    
</style>