<template>
    <div>
        <b-table id="referee-table"
            hover
            bordered
            striped
            outlined
            no-border-collapse
            :items="informationList" >
        </b-table>
        <b-button variant="primary" size="md" >
            Update Referee
        </b-button>
    </div>
</template>


<script>

export default {
    name: "RefereePreview",

    props: {
        refereeInfo: {
            type: Object,
            require: true,
        }
    },
    computed:{

        informationList(){

            var infoList = [];

            if ( this.refereeInfo != {} ){
                infoList.push( {
                    refereeId : this.refereeInfo.refereeID,
                    firstName : this.refereeInfo.firstname,
                    lastName : this.refereeInfo.lastname,
                    course : this.refereeInfo.course
                });
            }
            return infoList;
        }
    },
    mounted(){
        console.log("Referee Preview Mounted");
    }
}

</script>


<style scoped>


</style>